import { InjectionToken } from "@angular/core";
import { CinemaLocation } from "../entities/cinema-location.entity";

export abstract class CinemaLocationRepository {
  abstract getLocations(): Promise<CinemaLocation[]>;
}

export const CINEMA_LOCATION_REPOSITORY = new InjectionToken<CinemaLocationRepository>(
  "CinemaLocationRepository"
);
