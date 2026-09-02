import { Request, Response, NextFunction } from "express";
import { verificarToken, TokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      usuario?: TokenPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const [bearer, token] = authHeader.split(" ");

  // Checar o formato do token "Bearer <token>"
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token mal formatado." });
  }

  try {
    const payload = verificarToken(token);
    req.usuario = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
