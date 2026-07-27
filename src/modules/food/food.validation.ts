import { z } from "zod";

export const createFoodSchema = z.object({
  name: z.string().min(2),

  description: z.string().optional(),

  price: z.number().positive(),

  imageUrl: z.string().optional(),

  categoryId: z.string(),
});

export const updateFoodSchema = z.object({
    name: z.string().min(2).optional(),
  
    description: z.string().optional(),
  
    price: z.number().positive().optional(),
  
    imageUrl: z.string().optional(),
  
    categoryId: z.string().optional(),
  
    available: z.boolean().optional(),
  });