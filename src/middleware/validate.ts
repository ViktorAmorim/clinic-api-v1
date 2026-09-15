import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export function validateDTO<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const erros = await validate(dto);
    if (erros.length > 0) {
      const detalhes = erros.flatMap((e) => Object.values(e.constraints || {}));
      return res.status(400).json({ erros: detalhes });
    }

    req.body = dto;
    next();
  };
}
