import { Router } from "express";
import { reservationController } from "./reservation.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createReservationSchema } from "./reservation.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";


const router = Router();


router.post(
  "/",
  validate(createReservationSchema),
  reservationController.createReservation
);

router.get(
    "/my",
    authMiddleware,
    reservationController.getMyReservations
  );


export default router;