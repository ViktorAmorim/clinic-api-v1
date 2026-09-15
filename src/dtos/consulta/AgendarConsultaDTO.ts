import { IsDateString, IsOptional, IsUUID } from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *    AgendarConsultaDTO:
 *      type: object
 *      required: [medicoId, data]
 *      properties:
 *        medicoId: {type: string, format: uuid, example: "123e4567-e89b-12d3-a456-426614174000"}
 *        data: {type: string, format: date-time, example: "2023-05-15T14:30:00Z"}
 *        observacoes: {type: string, example: "Paciente apresenta sintomas de gripe"}
 *
 */

export class AgendarConsultaDTO {
  @IsUUID("4", { message: "O ID do médico deve ser um UUID válido." })
  medicoId!: string;

  @IsDateString(
    {},
    { message: "A data e hora da consulta deve ser uma data e hora válida." },
  )
  dataHora!: Date;

  @IsOptional()
  observacoes?: string;
}
