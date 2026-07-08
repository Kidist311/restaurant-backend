import type { Request, Response } from "express";
import { createFoodSchema } from "../validators/menu.validator.js";

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

export const addFood = (req: Request, res: Response) => {
  const result = createFoodSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
  }

  const food = result.data;

  console.log(food);


  res.status(201).json({
    success: true,
    message: "Food added successfully!",
    data: food,
  });
};

