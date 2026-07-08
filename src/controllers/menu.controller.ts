import type { Request, Response } from "express";
import { createFoodSchema } from "../validators/menu.validator.js";
import { createFood } from "../services/menu.service.js";

export const getMenu = (req: Request, res: Response) => {
  const menu = [
    {
      id: 1,
      name: "Burger",
      price: 5,
      category: "Lunch",
    },
    {
      id: 2,
      name: "Pizza",
      price: 8,
      category: "Dinner",
    },
  ];

  res.json({
    success: true,
    data: menu,
  });
};

export const addFood = async (req: Request, res: Response) => {
  const result = createFoodSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    //const food = result.data;
    const food = await createFood(result.data);

    console.log(food);

    res.status(201).json({
      success: true,
      message: "Food added successfully!",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
    
};

