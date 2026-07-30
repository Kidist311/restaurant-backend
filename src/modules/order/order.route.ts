import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware.js";
import { createOrderSchema } from "./order.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { orderController } from "./order.controller.js";
//import { authorize } from "../../middlewares/authorize.middleware.js";
//import { Role } from "../../generated/prisma/index.js";
import { authorize } from "../auth/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";


const router = Router();


router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  orderController.createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  orderController.getMyOrders
);


router.get(
  "/",
  authMiddleware,
  authorize(Role.OWNER),
  orderController.getAllOrders
);

export default router;