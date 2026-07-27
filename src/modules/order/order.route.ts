import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware.js";
import { createOrderSchema } from "./order.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { orderController } from "./order.controller.js";

const router = Router();


router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  orderController.createOrder
);


export default router;