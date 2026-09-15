import { IsEnum } from "class-validator";
import { ConsultaStatus } from "../../entities/Consulta";

export class AtualizarStatusConsultaDTO {
  @IsEnum(ConsultaStatus, {
    message: "O status da consulta deve ser AGENDADA, REALIZADA ou CANCELADA.",
  })
  status!: ConsultaStatus;
}
