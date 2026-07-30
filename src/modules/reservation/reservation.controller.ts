import type { Request, Response } from "express";
import { reservationService } from "./reservation.service.js";


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

export const reservationController = {
  createReservation,
  getMyReservations,
};