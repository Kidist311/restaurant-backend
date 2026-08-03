import { z } from "zod";


export const createReservationSchema = z.object({
  name: z.string().trim().min(2),
  
  email: z.string().trim().email(),

  phone: z.string().trim().min(9),

  message: z.string().optional(),

  reservationDate: z.string(),

  reservationTime: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Invalid reservation time"
  ),

  numberOfGuests: z.number().int().min(1),
});

export const updateReservationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "COMPLETED",
  ]),
});