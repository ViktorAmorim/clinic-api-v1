import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const pacienteRoutes = Router();
const pacienteController = new PacienteController();

// Aplicar o middleware de autenticação a todas as rotas de paciente
pacienteRoutes.use(authMiddleware);

pacienteRoutes.get("/me", roleMiddleware(UsuarioRole.PACIENTE), (req, res) =>
  pacienteController.meuPerfil(req, res),
);
pacienteRoutes.get(
  "/",
  roleMiddleware(UsuarioRole.MEDICO, UsuarioRole.ADMIN),
  (req, res) => pacienteController.listar(req, res),
);
export { pacienteRoutes };
