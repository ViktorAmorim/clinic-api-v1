import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  synchronize: true,
  logging: true,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});
