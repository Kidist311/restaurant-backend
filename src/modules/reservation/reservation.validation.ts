import { z } from "zod";


export const createReservationSchema = z.object({
  name: z.string().min(2),
  
  email: z.string().email(),

  phone: z.string().min(9),

  message: z.string().optional(),

  reservationDate: z.string(),

  reservationTime: z.string(),

  numberOfGuests: z.number().min(1),
});