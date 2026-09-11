import { Router } from "express";
import { ConsultaController } from "../controllers/ConsultaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const consultaRoutes = Router();
const consultaController = new ConsultaController();

consultaRoutes.use(authMiddleware);

// Só o PACIENTE agenda consulta para si mesmo
consultaRoutes.post("/", roleMiddleware(UsuarioRole.PACIENTE), (req, res) =>
  consultaController.agendar(req, res),
);

// PACIENTE, MEDICO e ADMIN podem listar — cada um vê seu recorte
consultaRoutes.get(
  "/",
  roleMiddleware(UsuarioRole.PACIENTE, UsuarioRole.MEDICO, UsuarioRole.ADMIN),
  (req, res) => consultaController.listar(req, res),
);

// Só o MEDICO altera o status (realizar/cancelar) de uma consulta
consultaRoutes.patch(
  "/:id/status",
  roleMiddleware(UsuarioRole.MEDICO),
  (req, res) => consultaController.atualizarStatus(req, res),
);

export { consultaRoutes };
