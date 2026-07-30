
import type { Request, Response } from "express";
import { orderService } from "./order.service.js";
import { get } from "node:http";

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

  const getMyOrders = async (
    req: Request,
    res: Response
  ) => {
  
    const orders = await orderService.getMyOrders(
      req.user.id
    );
  
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  };


  const getAllOrders = async (
    req: Request,
    res: Response
  ) => {
  
    const orders = await orderService.getAllOrders();
  
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  
  };


  const updateOrderStatus = async (
    req: Request,
    res: Response
  ) => {
  
    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id as string,
      req.body.status
    );
  
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  
  };


  export const orderController = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
  };