/**
 * @openapi
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       properties:
 *         email: {type: string, format: email, example: "jgB2M@example.com"}
 *         senha: {type: string, format: password, example: "senha123", minLength: 6}
 *       required: [email, senha]
 */

import { IsEmail, MinLength, IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "O email é inválido" })
  email!: string;

  @MinLength(1, { message: "A senha é obrigatória" })
  senha!: string;
}
