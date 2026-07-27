import { prisma } from "../../config/prisma.js";
import type { CreateFoodPayload } from "./food.type.js";


const createFood = async (
  payload: CreateFoodPayload
) => {

  const food = await prisma.food.create({
    data: {
      name: payload.name,
      description: payload.description ?? null,
      price: payload.price,
      imageUrl: payload.imageUrl,
      categoryId: payload.categoryId,
    },
  });


  return food;
};


export const foodService = {
  createFood,
};