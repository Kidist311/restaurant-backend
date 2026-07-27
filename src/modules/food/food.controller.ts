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

const getFoods = async (
    req: Request,
    res: Response
  ) => {
  
    const foods = await foodService.getFoods();
  
    return res.status(200).json({
      success: true,
      data: foods,
    });
  };

  const getFoodById = async (
    req: Request,
    res: Response
  ) => {
    const foodId = typeof req.params.id === 'string' ? req.params.id : '';
    const food = await foodService.getFoodById(foodId);
  
    return res.status(200).json({
      success: true,
      data: food,
    });
  };

  const updateFood = async (
    req: Request,
    res: Response
  ) => {
  
    const food = await foodService.updateFood(
      typeof req.params.id === 'string' ? req.params.id : '',
      req.body
    );
  
  
    return res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  };


  const deleteFood = async (
    req: Request,
    res: Response
  ) => {
  
    const food = await foodService.deleteFood(
      typeof req.params.id === 'string' ? req.params.id : ''
    );
  
  
    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: food,
    });
  };


export const foodController = {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
};