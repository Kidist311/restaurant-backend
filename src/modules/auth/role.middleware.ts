import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError.js";
import type { Role } from "../../generated/prisma/client.js";

export const authorize = (...roles: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    const user = req.user as { role: Role };

    if (!roles.includes(user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
};