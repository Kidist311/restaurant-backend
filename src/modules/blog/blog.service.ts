import { prisma } from "../../config/prisma.js";
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

export const blogService = {
  createBlog,
};