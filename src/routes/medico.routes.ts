import { Router } from "express";
import { MedicoController } from "../controllers/MedicoController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { UsuarioRole } from "../entities/Usuario";

const medicoRoutes = Router();
const medicoController = new MedicoController();

/**
 * @openapi
 * /medicos:
 *   get:
 *     summary: Lista todos os médicos cadastrados
 *     tags: [Medicos]
 *     responses:
 *       '200':
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome: { type: string, example: "João da Silva" }
 *                   email: { type: string, format: email, example: "joao.silva@email.com" }
 *                   especialidade: { type: string, example: "Cardiologia" }
 */
medicoRoutes.get("/", (req, res) => medicoController.listar(req, res));

/**
 * @openapi
 * /medicos/me:
 *   get:
 *     summary: Exibe o perfil do médico logado
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil do médico
 *         content:
 *           application/json:
 *             type: object
 *
 */
medicoRoutes.get(
  "/me",
  authMiddleware,
  roleMiddleware(UsuarioRole.MEDICO),
  (req, res) => medicoController.meuPerfil(req, res),
);

export { medicoRoutes };
