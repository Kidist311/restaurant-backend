import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        foodId: z.string().uuid(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});