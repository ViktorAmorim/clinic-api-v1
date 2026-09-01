import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Consulta } from "./Consulta";

@Entity("medicos")
export class Medico {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Usuario, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  usuario!: Usuario;

  @Column("varchar", { unique: true })
  crm!: string;

  @Column("varchar")
  especialidade!: string;

  // TODO: Consultas
  @OneToOne(() => Consulta, (consulta) => consulta.medico)
  consultas!: Consulta[];
}
