import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError.js";

// Define or import the Role type
type Role = "admin" | "user" | "manager"; // Adjust the roles as per your application

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      "Authentication required",
      401
    );
  }


  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(
      "Token not provided",
      401
    );
  }


  try {

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    if (typeof decoded === "object" && decoded !== null && "id" in decoded && "role" in decoded) {
      req.user = decoded as { id: string; role: Role };
    } else {
      throw new AppError(
        "Invalid token payload",
        401
      );
    }


    next();


  } catch (error) {

    throw new AppError(
      "Invalid token",
      401
    );

  }
};