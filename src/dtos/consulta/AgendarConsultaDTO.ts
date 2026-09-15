import { IsDateString, IsOptional, IsUUID } from "class-validator";

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
