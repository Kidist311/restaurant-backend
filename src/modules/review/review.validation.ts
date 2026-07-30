import { z } from "zod";

export const createReviewSchema = z.object({
  foodId: z.string().uuid(),

  rating: z.number().int().min(1).max(5),

  comment: z.string().optional(),
});

export const updateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
  
    comment: z.string().optional(),
  });