import { Medico } from "../../entities/Medico";
export class MedicoResponseDTO {
  especilidade!: string;

  constructor(medico: Medico) {
    this.especilidade = medico.especialidade;
  }
}
