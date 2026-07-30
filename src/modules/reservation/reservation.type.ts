export type CreateReservationPayload = {
    name: string;
    email: string;
    phone: string;
  
    message?: string;
  
    reservationDate: Date;
    reservationTime: string;
  
    numberOfGuests: number;
  };