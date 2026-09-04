import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pacienteRoutes } from "./paciente.routes";
import { medicoRoutes } from "./medico.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/pacientes", pacienteRoutes);
routes.use("/medicos", medicoRoutes);

export { routes };
