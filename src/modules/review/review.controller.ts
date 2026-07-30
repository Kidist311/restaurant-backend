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


const getReviewsByFood = async (
    req: Request,
    res: Response
  ) => {
    const reviews = await reviewService.getReviewsByFood(
      typeof req.params.foodId === "string" ? req.params.foodId : ""
    );
  
    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  }; 

  const updateReview = async (
    req: Request,
    res: Response
  ) => {
  
    const review = await reviewService.updateReview(
      typeof req.params.id === "string" ? req.params.id : "",
      req.user.id,
      req.body
    );
  
    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  };

  const deleteReview = async (
    req: Request,
    res: Response
  ) => {
    await reviewService.deleteReview(
      typeof req.params.id === "string" ? req.params.id : "",
      req.user.id
    );
  
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  };

export const reviewController = {
  createReview,
  getReviewsByFood,
  updateReview,
  deleteReview,
};