import { Router } from "express";
import { foodController } from "./food.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createFoodSchema } from "./food.validation.js";


const router = Router();


router.post(
  "/",
  authMiddleware,
  authorize(Role.OWNER),
  validate(createFoodSchema),
  foodController.createFood
);


export default router;