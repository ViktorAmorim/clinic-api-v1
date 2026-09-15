/**
 * @openapi
 * components:
 *   schemas:
 *     RegistrarMedicoDTO:
 *       type: object
 *       properties:
 *         nome: {type: string, example: "Joaquim"}
 *         email: {type: string, format: email, example: "jgB2M@example.com"}
 *         senha: {type: string, format: password, example: "senha123", minLength: 6}
 *         crm: {type: string, example: "123456"}
 *         especialidade: {type: string, example: "Cardiologia"}
 *       required: [nome, email, senha, crm, especialidade]
 */

import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegistrarMedicoDTO {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  nome!: string;

  @IsNotEmpty({ message: "O email é obrigatório" })
  @IsEmail({}, { message: "O email é inválido" })
  email!: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
  senha!: string;

  @IsNotEmpty({ message: "O CRM é obrigatório" })
  crm!: string;

  @IsNotEmpty({ message: "A especialidade é obrigadotório" })
  especialidade!: string;
}
