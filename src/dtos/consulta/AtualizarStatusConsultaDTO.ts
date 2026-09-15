import { IsEnum } from "class-validator";
import { ConsultaStatus } from "../../entities/Consulta";

/**
 * @penapi
 * components:
 *  schemas:
 *    AtualizarStatusConsultaDTO:
 *      type: object
 *      required: [status]
 *      properties:
 *        status: {type: string, enum: ["AGENDADA", "REALIZADA", "CANCELADA"], example: "REALIZADA"}
 */

export class AtualizarStatusConsultaDTO {
  @IsEnum(ConsultaStatus, {
    message: "O status da consulta deve ser AGENDADA, REALIZADA ou CANCELADA.",
  })
  status!: ConsultaStatus;
}
