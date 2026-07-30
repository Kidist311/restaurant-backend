import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createReviewSchema, updateReviewSchema } from "./review.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createReviewSchema),
  reviewController.createReview
);

router.get(
    "/food/:foodId",
    reviewController.getReviewsByFood
  );

  router.patch(
    "/:id",
    authMiddleware,
    validate(updateReviewSchema),
    reviewController.updateReview
  );

  router.delete(
    "/:id",
    authMiddleware,
    reviewController.deleteReview
  );

export default router;