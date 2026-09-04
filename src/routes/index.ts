import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pacienteRoutes } from "./paciente.routes";
import { medicoRoutes } from "./medico.routes";
import { consultaRoutes } from "./consulta.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/pacientes", pacienteRoutes);
routes.use("/medicos", medicoRoutes);
routes.use("/consultas", consultaRoutes);

export { routes };
