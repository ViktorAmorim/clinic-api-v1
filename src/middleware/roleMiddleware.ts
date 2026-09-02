import { Request, Response, NextFunction } from "express";
import { UsuarioRole } from "../entities/Usuario";

export function roleMiddleware(...rolesPermitidas: UsuarioRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    if (!rolesPermitidas.includes(req.usuario.role)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    return next();
  };
}
