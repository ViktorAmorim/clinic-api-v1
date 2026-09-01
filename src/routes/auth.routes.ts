import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register/paciente", (req, res) =>
  authController.registrarPaciente(req, res),
);
authRoutes.post("/register/medico", (req, res) =>
  authController.registrarMedico(req, res),
);
authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
