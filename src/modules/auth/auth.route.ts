import { Router } from "express";
import { authController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "./auth.middleware.js";
import { authorize } from "./role.middleware.js";
import { Role } from "../../generated/prisma/client.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

/*router.get(
  "/profile",
  authMiddleware,
  authController.profile
);*/

router.get(
  "/profile",
  authMiddleware,
  //authorize("CUSTOMER"),
  authorize(Role.OWNER, Role.CUSTOMER, Role.STAFF),
  authController.profile
);

export default router;