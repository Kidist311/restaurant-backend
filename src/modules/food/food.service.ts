import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
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

const getFoods = async () => {
    const foods = await prisma.food.findMany({
      include: {
        category: true,
      },
    });
  
    return foods;
  };

  const getFoodById = async (id: string) => {
    const food = await prisma.food.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        reviews: true,
      },
    });
  
    if (!food) {
      throw new AppError("Food not found", 404);
    }
  
    return food;
  };


export const foodService = {
  createFood,
  getFoods,
  getFoodById,
};