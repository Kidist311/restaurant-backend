export interface CreateFoodPayload {
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    categoryId: string;
  }

  export interface UpdateFoodPayload {
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    categoryId?: string;
    available?: boolean;
  }