import { Injectable } from "@angular/core";
import { CinemaLocationRepository } from "../repositories/cinema-location.repository";
import { CinemaLocation } from "../entities/cinema-location.entity";

@Injectable({ providedIn: 'root' })
export class GetLocationsUseCase {
  constructor(private locationRepository: CinemaLocationRepository) {}

  execute(): Promise<CinemaLocation[]> {
    return this.locationRepository.getLocations();
  }
}
