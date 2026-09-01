import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Medico } from "../entities/Medico";
import { Paciente } from "../entities/Paciente";
import { Usuario, UsuarioRole } from "../entities/Usuario";
import { gerarToken } from "../utils/jwt";

const usuarioRepository = AppDataSource.getRepository(Usuario);
const pacienteRepository = AppDataSource.getRepository(Paciente);
const medicoRepository = AppDataSource.getRepository(Medico);

export class AuthController {
  //POST /auth/register/paciente
  async registrarPaciente(req: Request, res: Response) {
    const { nome, email, senha, dataNascimento } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    const emailExiste = await usuarioRepository.findOneBy({ email });

    if (emailExiste) {
      return res.status(400).json({ message: "Email ja cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = usuarioRepository.create({
      nome: nome,
      email: email,
      senha: senhaHash,
      role: UsuarioRole.PACIENTE,
    });

    await usuarioRepository.save(usuario);

    const paciente = pacienteRepository.create({
      usuario: usuario,
      dataNascimento: dataNascimento,
    });

    await pacienteRepository.save(paciente);

    return res.status(201).json({
      id: paciente.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    });
  }

  //POST auth/register/medico
  async registrarMedico(req: Request, res: Response) {
    const { nome, email, senha, crm, especialidade } = req.body;

    if (!nome || !email || !senha || !crm || !especialidade) {
      return res.status(400).json({
        message: "Nome, email, senha, CRM e especialidade são obrigatórios.",
      });
    }

    const emailExiste = await usuarioRepository.findOneBy({ email });
    if (emailExiste) {
      return res.status(400).json({ message: "Email ja cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = usuarioRepository.create({
      nome: nome,
      email: email,
      senha: senhaHash,
      role: UsuarioRole.MEDICO,
    });

    await usuarioRepository.save(usuario);

    const medico = medicoRepository.create({
      usuario,
      crm,
      especialidade,
    });

    await medicoRepository.save(medico);

    return res.status(201).json({
      id: medico.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      crm: medico.crm,
      especialidade: medico.especialidade,
    });
  }

  //POST /auth/login
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha obrigatórios." });
    }

    const usuario = await usuarioRepository.findOneBy({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Credenciais Inválidas." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais Inválidas." });
    }

    const token = gerarToken({
      sub: usuario.id,
      role: usuario.role,
    });

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  }
}
