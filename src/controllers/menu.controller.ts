import type { Request, Response } from "express";

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
  const food = req.body;

  console.log(food);

  res.status(201).json({
    success: true,
    message: "Food added successfully!",
    data: food,
  });
};

export const getFoodById = (req: Request, res: Response) => {
  const id = req.params.id;

  console.log(id);

  res.json({
    message: "Food found",
    foodId: id,
  });
};