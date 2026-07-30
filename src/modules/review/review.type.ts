export type CreateReviewPayload = {
    foodId: string;
    rating: number;
    comment?: string;
  };

  export type UpdateReviewPayload = {
    rating?: number;
    comment?: string;
  };