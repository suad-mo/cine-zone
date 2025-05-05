import { Film } from "./film.model";
import { Hall } from "./hall.model";
import { Location } from "./location.model";
import { Projection } from "./projection.model";
import { Seat } from "./seat.model";
import { User } from "./user.model";

export interface Reservation {
  id: number; // Unique identifier for the reservation
  userId: string; // ID of the user who made the reservation
  projectionId: number; // ID of the projection for which the reservation is made
  seats: Seat[]; // Array of seat numbers reserved
  price: number; // Total price for the reservation
}

export interface ReservationDataView {
  id: number; // Unique identifier for the reservation data
  user: User | undefined,
  projection: Projection | undefined; // Projection details
  film: Film | undefined; // Name of the film
  location: Location | undefined // Location of the cinema
  hall: Hall | undefined; // Hall name or number
  dateTime: string; // Date and time of the projection
  seats: Seat[]; // Array of selected seats
  price: number; // Total price for the reservation
}


