import { Router } from "express";
import { ConsultaController } from "../controllers/ConsultaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const consultaRoutes = Router();
const consultaController = new ConsultaController();

consultaRoutes.use(authMiddleware);

consultaRoutes.post("/", roleMiddleware(UsuarioRole.PACIENTE), (req, res) =>
  consultaController.agendar(req, res),
);

export { consultaRoutes };
