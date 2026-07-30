import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { CreateReviewPayload, UpdateReviewPayload } from "./review.type.js";

const createReview = async (
  userId: string,
  payload: CreateReviewPayload
) => {

  const food = await prisma.food.findUnique({
    where: {
      id: payload.foodId,
    },
  });

  if (!food) {
    throw new AppError("Food not found", 404);
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      userId_foodId: {
        userId,
        foodId: payload.foodId,
      },
    },
  });

  if (existingReview) {
    throw new AppError(
      "You have already reviewed this food",
      409
    );
  }

  const review = await prisma.review.create({
    data: {
      userId,
      foodId: payload.foodId,
      rating: payload.rating,
      comment: payload.comment ?? null,
    },
  });

  return review;
};


const getReviewsByFood = async (foodId: string) => {
    const food = await prisma.food.findUnique({
      where: {
        id: foodId,
      },
    });
  
    if (!food) {
      throw new AppError("Food not found", 404);
    }
  
    const reviews = await prisma.review.findMany({
      where: {
        foodId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return reviews;
  };


  const updateReview = async (
    reviewId: string,
    userId: string,
    payload: UpdateReviewPayload
  ) => {
  
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
  
    if (!review) {
      throw new AppError("Review not found", 404);
    }
  
    if (review.userId !== userId) {
      throw new AppError(
        "You are not allowed to update this review",
        403
      );
    }
  
    const updatedReview = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: payload,
    });
  
    return updatedReview;
  };

  const deleteReview = async (
    reviewId: string,
    userId: string
  ) => {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
  
    if (!review) {
      throw new AppError("Review not found", 404);
    }
  
    if (review.userId !== userId) {
      throw new AppError(
        "You are not allowed to delete this review",
        403
      );
    }
  
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
  };


export const reviewService = {
  createReview,
  getReviewsByFood,
  updateReview,
  deleteReview,
};