import type { Request, Response } from "express";
import { reservationService } from "./reservation.service.js";

const createReservation = async (
  req: Request,
  res: Response
) => {

  const reservation =
    await reservationService.createReservation(
      req.body,
      req.user.id
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
    req: Request,
    res: Response
  ) => {
    const reservation =
      await reservationService.updateReservationStatus(
        req.params.id as string,
        req.body.status
      );
  
    return res.status(200).json({
      success: true,
      message: "Reservation status updated successfully",
      data: reservation,
    });
  };


export const reservationController = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
};