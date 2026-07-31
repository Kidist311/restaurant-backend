import { Router } from "express";
import { blogController } from "./blog.controller.js";

import { validate } from "../../middlewares/validate.middleware.js";
import { createBlogSchema } from "./blog.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";


const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize(Role.OWNER),
  validate(createBlogSchema),
  blogController.createBlog
);

router.get(
  "/",
  blogController.getPublishedBlogs
);

router.get(
  "/:id",
  blogController.getPublishedBlogById
);

router.patch(
  "/:id/publish",
  authMiddleware,
  authorize(Role.OWNER),
  blogController.publishBlog
);

export default router;