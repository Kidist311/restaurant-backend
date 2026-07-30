import { z } from "zod";
import { OrderStatus } from "../../generated/prisma/client.js";

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


export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});