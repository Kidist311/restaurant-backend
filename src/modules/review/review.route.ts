import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createReviewSchema } from "./review.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createReviewSchema),
  reviewController.createReview
);

export default router;