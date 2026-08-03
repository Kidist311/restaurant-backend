import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { ReservationStatus } from "../../generated/prisma/client.js";
import type { CreateReservationPayload } from "./reservation.type.js";



const createReservation = async (
  payload: CreateReservationPayload,
  userId?: string
) => {

  const reservation = await prisma.reservation.create({
    data: {
      ...payload,

      reservationDate: new Date(
        payload.reservationDate
      ),

      ...(userId && { userId }),
    },
  });


  return reservation;
};



  const getMyReservations = async (userId: string) => {

    const reservations = await prisma.reservation.findMany({
      where: {
        userId,
      },
      orderBy: {
        reservationDate: "asc",
      },
    });
  
    return reservations;
  };


  const getAllReservations = async () => {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        reservationDate: "asc",
      },
    });
  
    return reservations;
  };


  const updateReservationStatus = async (
    reservationId: string,
    status:  ReservationStatus,
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
          status,
        },
      });
  
  
    return updatedReservation;
  };


export const reservationService = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
};