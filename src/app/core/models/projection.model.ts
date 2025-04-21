import { Seat } from "./seat.model";

export interface Projection {
  id: number;
  dateTime: string; // Date and time of the projection
  filmId: number; // ID of the film being projected
  cinemaHallId: number; // ID of the cinema hall where the projection takes place
  cinemaLocationId: number; // ID of the cinema location
  seatMap: Seat[][]; // 2D array representing the seat map for the projection
  availableSeats: number; // Number of available seats for this projection
  reservedSeats: number; // Number of reserved seats for this projection
  totalSeats: number; // Total number of seats in the cinema hall
}

export interface ProjectionWithDate extends Omit<Projection, 'dateTime'> {
  dateTime: Date; // Date and time of the projection as a Date object
}
