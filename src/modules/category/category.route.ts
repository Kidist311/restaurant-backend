import { Router } from "express";
import { categoryController } from "./category.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";

const router = Router();


router.post(
  "/",
  authMiddleware,
  authorize(Role.OWNER),
  validate(createCategorySchema),
  categoryController.createCategory
);


router.get(
    "/",
    categoryController.getCategories
  );


  router.get(
    "/:id",
    categoryController.getCategoryById
  );


  router.patch(
    "/:id",
    authMiddleware,
    authorize(Role.OWNER),
    validate(updateCategorySchema),
    categoryController.updateCategory
  );

  router.delete(
    "/:id",
    authMiddleware,
    authorize(Role.OWNER),
    categoryController.deleteCategory
  );

export default router;