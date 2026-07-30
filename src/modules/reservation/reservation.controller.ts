import type { Request, Response } from "express";
import { reservationService } from "./reservation.service.js";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";


const createReservation = async (
  req: Request,
  res: Response
) => {

  const reservation =
    await reservationService.createReservation(
      req.body
    );


  return res.status(201).json({
    success: true,
    message: "Reservation created successfully",
    data: reservation,
  });

};


const getMyReservations = async (
    req: Request,
    res: Response
  ) => {
  
    const reservations =
      await reservationService.getMyReservations(
        req.user.id
      );
  
    return res.status(200).json({
      success: true,
      message: "Reservations retrieved successfully",
      data: reservations,
    });
  
  };

  const getAllReservations = async (
    req: Request,
    res: Response
  ) => {
  
    const reservations =
      await reservationService.getAllReservations();
  
    return res.status(200).json({
      success: true,
      message: "Reservations retrieved successfully",
      data: reservations,
    });
  };

  const updateReservationStatus = async (
    reservationId: string,
    status: string
  ) => {
  
    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: reservationId,
        },
      });
  
  
    if (!reservation) {
      throw new AppError(
        "Reservation not found",
        404
      );
    }
  
  
    const updatedReservation =
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: status as any,
        },
      });
  
  
    return updatedReservation;
  };

export const reservationController = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
};