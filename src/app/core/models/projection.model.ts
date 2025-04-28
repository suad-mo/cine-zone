import { Seat } from "./seat.model";

export interface Projection {
  id: number;
  filmId: number; // ID of the film being projected
  hallId: number; // ID of the cinema hall where the projection takes place
  locationId: number; // ID of the cinema location
  dateTime: string; // Date and time of the projection
  availableSeats: number; // Number of available seats for this projection
  price: number; // Price of the ticket for this projection
  seatMap: Seat[][]; // 2D array representing the seat map for this projection
}

export interface ProjectionWithDate extends Omit<Projection, 'dateTime'> {
  dateTime: Date; // Date and time of the projection as a Date object
}
