import { Usuario } from "../../entities/Usuario";

export class UsuarioResponseDTO {
  id!: string;
  nome!: string;
  email!: string;
  role!: string;
  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.role = usuario.role;
  }
}
