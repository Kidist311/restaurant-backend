import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(3),

  content: z.string().trim().min(10),

  imageUrl: z.string().url().optional(),
});

export const updateBlogSchema = z
  .object({
    title: z.string().trim().min(3).optional(),

    content: z.string().trim().min(10).optional(),

    imageUrl: z.string().url().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required",
    }
  );