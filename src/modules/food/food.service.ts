import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { CreateFoodPayload, UpdateFoodPayload } from "./food.type.js";


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

  const updateFood = async (
    id: string,
    payload: UpdateFoodPayload
  ) => {
    const existingFood = await prisma.food.findUnique({
      where: { id },
    });
  
    if (!existingFood) {
      throw new AppError("Food not found", 404);
    }
  
    if (payload.categoryId) {
      const category = await prisma.category.findUnique({
        where: {
          id: payload.categoryId,
        },
      });
  
      if (!category) {
        throw new AppError("Category not found", 404);
      }
    }
  
    const food = await prisma.food.update({
      where: { id },
      data: payload,
    });
  
    return food;
  };


  const deleteFood = async (id: string) => {

    const existingFood = await prisma.food.findUnique({
      where: {
        id,
      },
    });
  
  
    if (!existingFood) {
      throw new AppError("Food not found", 404);
    }
  
  
    const food = await prisma.food.delete({
      where: {
        id,
      },
    });
  
  
    return food;
  };


export const foodService = {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
};