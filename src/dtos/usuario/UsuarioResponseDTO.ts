import { Usuario } from "../../entities/Usuario";

/**
 * @openapi
 * components:
 *   schemas:
 *     UsuarioResponseDTO:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid, example: "123e4567-e89b-12d3-a456-426614174000" }
 *         nome: { type: string, example: "João da Silva" }
 *         email: { type: string, format: email, example: "joao.silva@email.com" }
 *         role: { type: string, enum: [PACIENTE, MEDICO, ADMIN], example: "PACIENTE" }
 */

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
