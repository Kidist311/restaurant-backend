export interface CreateFoodPayload {
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    categoryId: string;
  }