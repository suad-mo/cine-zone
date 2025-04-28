import { Seat } from "./seat.model";

export interface Reservation {
  id: number; // Unique identifier for the reservation
  userId: string; // ID of the user who made the reservation
  projectionId: number; // ID of the projection for which the reservation is made
  seats: Seat; // Array of seat numbers reserved
}
