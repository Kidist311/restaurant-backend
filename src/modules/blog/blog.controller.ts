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


const getPublishedBlogs = async (
  req: Request,
  res: Response
) => {
  const blogs = await blogService.getPublishedBlogs();

  return res.status(200).json({
    success: true,
    message: "Published blogs retrieved successfully",
    data: blogs,
  });
}; 

const getPublishedBlogById = async (
  req: Request,
  res: Response
) => {
  const blog = await blogService.getPublishedBlogById(
    req.params.id as string
  );

  return res.status(200).json({
    success: true,
    message: "Blog retrieved successfully",
    data: blog,
  });
};


const publishBlog = async (
  req: Request,
  res: Response
) => {
  const blog = await blogService.publishBlog(
    req.params.id as string,
    req.user.id
  );

  return res.status(200).json({
    success: true,
    message: "Blog published successfully",
    data: blog,
  });
};


export const blogController = {
  createBlog,
  getPublishedBlogs,
  getPublishedBlogById,
  publishBlog,
};