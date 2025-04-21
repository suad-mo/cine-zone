import { CinemaHall } from "./cinema-hall.model";

export interface CinemaLocation {
  id: number;
  name: string;
  address: string;
  halls: CinemaHall[]; // Array of cinema halls associated with this location
  // phoneNumber: string;
  // email: string;
  // website: string;
  // latitude: number; // Optional, if you want to include location coordinates
  // longitude: number; // Optional, if you want to include location coordinates
  // cinemaHalls: CinemaHall[]; // Optional, if you want to include cinema halls directly in the location model
}
