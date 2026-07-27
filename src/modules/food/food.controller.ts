import type { Request, Response } from "express";
import { foodService } from "./food.service.js";


const createFood = async (
  req: Request,
  res: Response
) => {

  const food = await foodService.createFood(
    req.body
  );


  return res.status(201).json({
    success: true,
    message: "Food created successfully",
    data: food,
  });

};


export const foodController = {
  createFood,
};