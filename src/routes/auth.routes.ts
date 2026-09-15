import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { RegistrarPacienteDTO } from "../dtos/auth/RegistrarPacienteDTO";
import { validateDTO } from "../middleware/validate";
import { RegistrarMedicoDTO } from "../dtos/auth/RegistrarMedicoDTO";
import { LoginDTO } from "../dtos/auth/LoginDTO";

const authRoutes = Router();
const authController = new AuthController();

/**
 * @openapi
 * /auth/register/paciente:
 *   post:
 *     summary: Registra um novo paciente
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrarPacienteDTO'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrarPacienteDTO'
 *       '400':
 *         description: Dados inválidos ou e-mail já cadastrado
 */
authRoutes.post(
  "/register/paciente",
  validateDTO(RegistrarPacienteDTO),
  (req, res) => authController.registrarPaciente(req, res),
);

/**
 * @openapi
 * /auth/register/medico:
 *   post:
 *     summary: Registra um novo médico
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrarMedicoDTO'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrarMedicoDTO'
 *       '400':
 *         description: Dados inválidos ou e-mail já cadastrado
 */
authRoutes.post(
  "/register/medico",
  validateDTO(RegistrarMedicoDTO),
  (req, res) => authController.registrarMedico(req, res),
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário (paciente, médico ou admin)
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       '200':
 *         description: Login bem-sucedido - Retorna um token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginDTO'
 *       '401':
 *         description: Credenciais inválidas
 */
authRoutes.post("/login", validateDTO(LoginDTO), (req, res) =>
  authController.login(req, res),
);

export { authRoutes };
