import { Router } from "express";
import { ConsultaController } from "../controllers/ConsultaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";
import { validateDTO } from "../middleware/validate";
import { AgendarConsultaDTO } from "../dtos/consulta/AgendarConsultaDTO";
import { AtualizarStatusConsultaDTO } from "../dtos/consulta/AtualizarStatusConsultaDTO";

const consultaRoutes = Router();
const consultaController = new ConsultaController();

consultaRoutes.use(authMiddleware);

// Só o PACIENTE agenda consulta para si mesmo
consultaRoutes.post(
  "/",
  roleMiddleware(UsuarioRole.PACIENTE),
  validateDTO(AgendarConsultaDTO),
  (req, res) => consultaController.agendar(req, res),
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
  validateDTO(AtualizarStatusConsultaDTO),
  (req, res) => consultaController.atualizarStatus(req, res),
);

export { consultaRoutes };
