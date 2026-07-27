export interface OrderItemPayload {
    foodId: string;
    quantity: number;
  }
  
  export interface CreateOrderPayload {
    items: OrderItemPayload[];
  }

  export interface OrderItemData {
    foodId: string;
    quantity: number;
    price: number;
  }