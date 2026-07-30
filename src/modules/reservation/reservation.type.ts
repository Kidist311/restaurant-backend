export type CreateReservationPayload = {
    name: string;
    email: string;
    phone: string;
  
    message?: string;
  
    reservationDate: Date;
    reservationTime: string;
  
    numberOfGuests: number;
  };

  export type UpdateReservationStatusPayload = {
    status:
      | "PENDING"
      | "CONFIRMED"
      | "CANCELLED"
      | "COMPLETED";
  };