import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

//Enum para representar as roles do usúario
export enum UsuarioRole {
  PACIENTE = "PACIENTE",
  MEDICO = "MEDICO",
  ADMIN = "ADMIN",
}

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  nome!: string;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar")
  senha!: string;

  @Column({ type: "enum", enum: UsuarioRole, default: UsuarioRole.PACIENTE })
  role!: UsuarioRole;

  @CreateDateColumn()
  createdEm!: Date;
}
