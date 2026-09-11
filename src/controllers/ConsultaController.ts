import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Medico } from "../entities/Medico";
import { Paciente } from "../entities/Paciente";
import { UsuarioRole } from "../entities/Usuario";
import { Consulta, ConsultaStatus } from "../entities/Consulta";

const consultaRepository = AppDataSource.getRepository(Consulta);
const medicoRepository = AppDataSource.getRepository(Medico);
const pacienteRepository = AppDataSource.getRepository(Paciente);

export class ConsultaController {
  // POST /consultas
  async agendar(req: Request, res: Response) {
    const { medicoID, dataHora, observacoes } = req.body;

    if (!medicoID || !dataHora) {
      return res
        .status(400)
        .json({ erro: "medicoID e dataHora são obrigatórios" });
    }

    const paciente = await pacienteRepository.findOne({
      where: { usuario: { id: req.usuario?.sub } },
    });

    if (!paciente) {
      return res.status(404).json({ erro: "Paciente não encontrado." });
    }

    const medico = await medicoRepository.findOneBy({ id: medicoID });

    if (!medico) {
      return res.status(404).json({ erro: "Medico não encontrado." });
    }

    const consulta = consultaRepository.create({
      paciente,
      medico,
      dataHora: new Date(dataHora),
      observacoes,
      status: ConsultaStatus.AGENDADA,
    });
    await consultaRepository.save(consulta);

    return res.status(201).json(consulta);
  }

  // GET /consultas
  async listar(req: Request, res: Response) {
    const { role, sub } = req.usuario!;

    if (role === UsuarioRole.PACIENTE) {
      const paciente = await pacienteRepository.findOne({
        where: { usuario: { id: sub } },
      });
      const consultas = await consultaRepository.find({
        where: { paciente: { id: paciente?.id } },
        order: { dataHora: "ASC" },
      });
      return res.json(consultas);
    }

    if (role === UsuarioRole.MEDICO) {
      const medico = await medicoRepository.findOne({
        where: { usuario: { id: sub } },
      });
      const consultas = await consultaRepository.find({
        where: { medico: { id: medico?.id } },
        order: { dataHora: "ASC" },
      });
      return res.json(consultas);
    }

    // ADMIN vê tudo
    const consultas = await consultaRepository.find({
      order: { dataHora: "ASC" },
    });
    return res.json(consultas);
  }

  // PATCH /consultas/:id/status
  async atualizarStatus(req: Request, res: Response) {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!Object.values(ConsultaStatus).includes(status)) {
      return res.status(400).json({ erro: "Status inválido." });
    }

    const consulta = await consultaRepository.findOne({ where: { id } });
    if (!consulta) {
      return res.status(404).json({ erro: "Consulta não encontrada." });
    }

    const medico = await medicoRepository.findOne({
      where: { usuario: { id: req.usuario!.sub } },
    });

    if (!medico || consulta.medico.id !== medico.id) {
      return res
        .status(403)
        .json({ erro: "Você só pode alterar consultas atribuídas a você." });
    }

    consulta.status = status;
    await consultaRepository.save(consulta);

    return res.json(consulta);
  }
}
