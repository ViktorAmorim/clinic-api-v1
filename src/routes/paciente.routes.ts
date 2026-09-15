import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const pacienteRoutes = Router();
const pacienteController = new PacienteController();

// Aplicar o middleware de autenticação a todas as rotas de paciente
pacienteRoutes.use(authMiddleware);

/**
 * @openapi
 * /pacientes/me:
 *   get:
 *     summary: Exibe o perfil do paciente logado
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: Perfil do paciente }
 *       '403': { description: "Papel diferente de PACIENTE" }
 *       '404': { description: Paciente não encontrado }
 */
pacienteRoutes.get("/me", roleMiddleware(UsuarioRole.PACIENTE), (req, res) =>
  pacienteController.meuPerfil(req, res),
);

/**
 * @openapi
 * /pacientes:
 *   get:
 *     summary: Lista todos os pacientes cadastrados (somente MEDICO e ADMIN)
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string, format: uuid, example: "123e4567-e89b-12d3-a456-426614174000" }
 *                   dataNascimento: { type: string, format: date, example: "1990-05-20" }
 *                   usuario:
 *                     $ref: '#/components/schemas/UsuarioResponseDTO'
 *       '403': { description: "Papel não autorizado" }
 */
pacienteRoutes.get(
  "/",
  roleMiddleware(UsuarioRole.MEDICO, UsuarioRole.ADMIN),
  (req, res) => pacienteController.listar(req, res),
);
export { pacienteRoutes };
