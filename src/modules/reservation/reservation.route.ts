import { Router } from "express";
import { reservationController } from "./reservation.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createReservationSchema, updateReservationStatusSchema } from "./reservation.validation.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { Role } from "../../generated/prisma/client.js";
import { authorize } from "../auth/role.middleware.js";


const router = Router();


router.post(
  "/",
  authMiddleware,
  validate(createReservationSchema),
  reservationController.createReservation
);

router.get(
    "/my",
    authMiddleware,
    reservationController.getMyReservations
  );

  router.get(
    "/",
    authMiddleware,
    authorize(Role.OWNER),
    reservationController.getAllReservations
  );

  router.patch(
    "/:id/status",
    authMiddleware,
    authorize(Role.OWNER),
    validate(updateReservationStatusSchema),
    reservationController.updateReservationStatus
  );

export default router;