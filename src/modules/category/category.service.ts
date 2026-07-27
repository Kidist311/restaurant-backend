import { prisma } from "../../config/prisma.js";
import type { CreateCategoryPayload } from "./category.type.js";


const createCategory = async (
  payload: CreateCategoryPayload
) => {

  const category = await prisma.category.create({
    data: {
      name: payload.name,
    },
  });


  return category;
};

const getCategories = async () => {
    const categories = await prisma.category.findMany({
      include: {
        foods: true,
      },
    });
  
    return categories;
  };  


  const getCategoryById = async (id: string) => {

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        foods: true,
      },
    });
  
  
    if (!category) {
      throw new Error("Category not found");
    }
  
  
    return category;
  };



  const updateCategory = async (
    id: string,
    name: string
  ) => {
  
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  
    return category;
  };

  const deleteCategory = async (id: string) => {

    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
  
    return category;
  };


export const categoryService = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};