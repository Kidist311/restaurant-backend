import type { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";

const register =
 async (
  req: Request, 
  res: Response,
  next: NextFunction ) => {
    try{
  const result = await authService.register(req.body);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
    }catch (error) {
      next(error);
    }
  
};

export const authController = {
  register,
};