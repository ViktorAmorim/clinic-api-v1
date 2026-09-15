/**
 * @openapi
 * components:
 *   schemas:
 *     RegistrarPacienteDTO:
 *       type: object
 *       properties:
 *         nome: {type: string, example: "Joaquim"}
 *         email: {type: string, format: email, example: "jgB2M@example.com"}
 *         senha: {type: string, format: password, example: "senha123", minLength: 6}
 *         dataNascimento: {type: string, format: date-time, example: "2000-01-01"}
 *       required: [nome, email, senha]
 */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsDateString,
} from "class-validator";

export class RegistrarPacienteDTO {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  nome!: string;

  @IsNotEmpty({ message: "O email é obrigatório" })
  @IsEmail({}, { message: "O email é inválido" })
  email!: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
  senha!: string;

  @IsOptional()
  @IsDateString({}, { message: "A data de nascimento é inválida" })
  dataNascimento?: Date;
}
