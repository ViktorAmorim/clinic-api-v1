import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pacienteRoutes } from "./paciente.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/pacientes", pacienteRoutes);

export { routes };
