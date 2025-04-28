import { Projection } from "./projection.model";
import { Seat } from "./seat.model";

export interface Hall {
  id: number;
  idLocation: number; // ID of the cinema location
  name: string;
  type: "2D" | "3D" | "4K" | "IMAX"; // Type of hall (e.g., standard, IMAX, etc.)
  description: string; // Description of the hall
  rows: number; // Number of rows in the hall
  columns: number; // Number of columns in the hall
  seatCapacity: number;
  seatMap: Seat[][]; // 2D array representing the seat map
}

// projections: Projection[]; // Array of projections associated with this cinema hall
// seatRows: number; // Number of rows in the seat map
// seatColumns: number; // Number of columns in the seat map
// seatType: string; // Type of seats (e.g., standard, premium, etc.)
// rows: number;
// columns: number;
// projectionId: number;
// cinemaLocationId: number;
// filmId: number;
// seats: Seat[]; // Optional, if you want to include seat information directly in the hall model
