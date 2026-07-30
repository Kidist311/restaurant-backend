import { prisma } from "../../config/prisma.js";
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

export const reservationService = {
  createReservation,
  getMyReservations,
};