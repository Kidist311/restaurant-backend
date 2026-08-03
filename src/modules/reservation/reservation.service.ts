import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import type { ReservationStatus } from "../../generated/prisma/client.js";
import type { CreateReservationPayload } from "./reservation.type.js";



const RESTAURANT_CAPACITY = 50;

const createReservation = async (
  payload: CreateReservationPayload,
  userId?: string
) => {

  const reservationDate = new Date(
    payload.reservationDate
  );

  // Check existing reservations for the same date and time
  const startOfDay = new Date(reservationDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(reservationDate);
  endOfDay.setHours(23, 59, 59, 999);
  
  const existingReservations =
    await prisma.reservation.findMany({
      where: {
        reservationDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        reservationTime: payload.reservationTime,
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        numberOfGuests: true,
      },
    });

     // Calculate already reserved guests
  const reservedGuests =
  existingReservations.reduce(
    (total, reservation) =>
      total + reservation.numberOfGuests,
    0
  );

// Check restaurant capacity
if (
  reservedGuests + payload.numberOfGuests >
  RESTAURANT_CAPACITY
) {
  throw new AppError(
    "Not enough reservation capacity available for this time",
    400
  );
}


  const reservation = await prisma.reservation.create({
    data: {
      ...payload,

      reservationDate,

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