import type { Request, Response } from "express";
import { reviewService } from "./review.service.js";

const createReview = async (
  req: Request,
  res: Response
) => {

  const review = await reviewService.createReview(
    req.user.id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: review,
  });
};

export const reviewController = {
  createReview,
};