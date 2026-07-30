import type { Request, Response } from "express";
import { blogService } from "./blog.service.js";

const createBlog = async (
  req: Request,
  res: Response
) => {
  const blog = await blogService.createBlog(
    req.user.id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
};

export const blogController = {
  createBlog,
};