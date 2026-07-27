
import type { Request, Response } from "express";
import { orderService } from "./order.service.js";

const createOrder = async (
    req: Request,
    res: Response
  ) => {
  
    const userId = req.user.id;
  
  
    const order = await orderService.createOrder(
      userId,
      req.body
    );
  
  
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  
  };

  export const orderController = {
    createOrder,
  };