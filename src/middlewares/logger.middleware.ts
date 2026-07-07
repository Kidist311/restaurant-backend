import type { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
};
/*
export const logger = (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      blocked: true,
      message: "Middleware stopped this request 🚫",
    });
  };*/