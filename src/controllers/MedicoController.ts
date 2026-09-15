import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Medico } from "../entities/Medico";
import { MedicoResponseDTO } from "../dtos/usuario/MedicoResponseDTO";

const medicoRepository = AppDataSource.getRepository(Medico);

export class MedicoController {
  //GET /medicos -public, sem autenticação
  async listar(req: Request, res: Response) {
    const medicos = await medicoRepository.find();

    const resposta = medicos.map((m) => ({
      nome: m.usuario.nome,
      email: m.usuario.email,
      especialidade: new MedicoResponseDTO(m).especilidade,
    }));
    return res.json(medicos);
  }

  // GET /medicos/me
  async meuPerfil(req: Request, res: Response) {
    const medico = await medicoRepository.findOne({
      where: { usuario: { id: req.usuario?.sub } },
    });

    if (!medico) {
      return res.status(404).json({ message: "Médico nao encontrado." });
    }
    return res.json(medico);
  }
}
