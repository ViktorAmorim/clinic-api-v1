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
  //GET /consultas
  async agendar(req: Request, res: Response) {
    const { medicoId, dataHora, observacoes } = req.body;

    if (!medicoId || !dataHora) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não preenchidos." });
    }

    const paciente = await pacienteRepository.findOne({
      where: { usuario: { id: req.usuario?.sub } },
    });
    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    const medico = await medicoRepository.findOneBy({ id: medicoId });
    if (!medico) {
      return res.status(404).json({ message: "Médico não encontrado." });
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
}
