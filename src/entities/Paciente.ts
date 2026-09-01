import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Consulta } from "./Consulta";

@Entity("pacientes")
export class Paciente {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Usuario, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  usuario!: Usuario;

  @Column({ type: "date", nullable: true, name: "data_nascimento" })
  dataNascimento?: string;

  //TODO: Consultas

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas!: Consulta[];
}
