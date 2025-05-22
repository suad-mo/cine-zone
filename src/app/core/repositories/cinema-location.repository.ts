import { CinemaLocation } from "../entities/cinema-location.entity";

export abstract class CinemaLocationRepository {
  abstract getLocations(): Promise<CinemaLocation[]>;
}
