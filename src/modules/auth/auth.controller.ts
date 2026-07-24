import type { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const register =
 async (
  req: Request, 
  res: Response,
  next: NextFunction ) => {
    
  const result = await authService.register(req.body);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
   
}



const login = async (
  req: Request,
  res: Response
) => {

  const result = await authService.login(req.body);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });

};


export const authController = {
  register: asyncHandler(register),
  login: asyncHandler(login),
};