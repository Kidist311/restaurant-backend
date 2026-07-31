import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import { BlogStatus } from "../../generated/prisma/client.js";
import type { CreateBlogPayload } from "./blog.type.js";

const createBlog = async (
  authorId: string,
  payload: CreateBlogPayload
) => {

  const blog = await prisma.blog.create({
    data: {
      title: payload.title,
      content: payload.content,
      imageUrl: payload.imageUrl ?? null,
      authorId,
    },
  });

  return blog;
};

const getPublishedBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return blogs;
};


const getPublishedBlogById = async (blogId: string) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id: blogId,
      status: "PUBLISHED",
    },
  });

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  return blog;
};

const publishBlog = async (
  blogId: string,
  authorId: string
) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  if (blog.authorId !== authorId) {
    throw new AppError(
      "You are not allowed to publish this blog",
      403
    );
  }

  if (blog.status === BlogStatus.PUBLISHED) {
    throw new AppError(
      "Blog is already published",
      400
    );
  }

  const publishedBlog = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      status: BlogStatus.PUBLISHED,
    },
  });

  return publishedBlog;
};


export const blogService = {
  createBlog,
  getPublishedBlogs,
  getPublishedBlogById,
  publishBlog,
};