import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { CreateReviewPayload } from "./review.type.js";

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

export const reviewService = {
  createReview,
};