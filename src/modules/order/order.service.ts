import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { CreateOrderPayload, OrderItemData } from "./order.type.js";


const createOrder = async (
  userId: string,
  payload: CreateOrderPayload
) => {

  let totalPrice = 0;

  // Store checked food data for creating OrderItems later
  const orderItemsData: OrderItemData[] = [];


  // 1. Validate foods and calculate total price
  for (const item of payload.items) {

    const food = await prisma.food.findUnique({
      where: {
        id: item.foodId,
      },
    });


    if (!food) {
      throw new AppError("Food not found", 404);
    }


    if (!food.available) {
      throw new AppError("Food is unavailable", 400);
    }


    const subtotal = Number(food.price) * item.quantity;

    totalPrice += subtotal;


    orderItemsData.push({
      foodId: food.id,
      quantity: item.quantity,
      price: food.price.toNumber(),
    });

  }



  // 2. Create Order and OrderItems together
  const order = await prisma.$transaction(async (tx) => {


    const createdOrder = await tx.order.create({
      data: {
        userId,
        totalPrice,
      },
    });



    // Create all order items
    for (const item of orderItemsData) {

      await tx.orderItem.create({
        data: {
          orderId: createdOrder.id,
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price,
        },
      });

    }


    return createdOrder;

  });



  return order;

};



export const orderService = {
  createOrder,
};