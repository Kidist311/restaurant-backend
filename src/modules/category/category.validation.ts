import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string() .trim().min(2),
});

export const updateCategorySchema = z.object({
    name: z.string().trim().min(2),
  });