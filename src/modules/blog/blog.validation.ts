import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3),

  content: z.string().min(10),

  imageUrl: z.string().url().optional(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(3).optional(),

  content: z.string().min(10).optional(),

  imageUrl: z.string().url().optional(),
});