import { Router } from "express";
import { MedicoController } from "../controllers/MedicoController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const medicoRoutes = Router();
const medicoController = new MedicoController();

medicoRoutes.get("/", (req, res) => medicoController.listar(req, res));

medicoRoutes.get(
  "/me",
  authMiddleware,
  roleMiddleware(UsuarioRole.MEDICO),
  (req, res) => medicoController.meuPerfil(req, res),
);

export { medicoRoutes };
