import { z } from "zod";

export const createFoodSchema = z.object({
  name: z.string().min(1, "Food name is required"),

  description: z.string().min(1, "Description is required"),

  price: z.number().positive("Price must be greater than 0"),

  category: z.string().min(1, "Category is required"),

  image: z.string().min(1, "Image is required"),
});