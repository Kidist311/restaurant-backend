import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // No Authorization header = guest
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new AppError("Token not provided", 401)
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    if (typeof decoded === "object" && decoded !== null) {
      req.user = {
        id: (decoded as any).id,
        role: (decoded as any).role,
      };
    } else {
      return next(new AppError("Invalid token payload", 401));
    }

    return next();

  } catch (error) {
    return next(
      new AppError("Invalid token", 401)
    );
  }
};