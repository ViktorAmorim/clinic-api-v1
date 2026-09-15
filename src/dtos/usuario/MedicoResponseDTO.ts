import { Medico } from "../../entities/Medico";

/**
 * @openapi
 * components:
 *   schemas:
 *     MedicoResponseDTO:
 *       type: object
 *       properties:
 *         especialidade: { type: string, example: "Cardiologia" }
 */
export class MedicoResponseDTO {
  especilidade!: string;

  constructor(medico: Medico) {
    this.especilidade = medico.especialidade;
  }
}
