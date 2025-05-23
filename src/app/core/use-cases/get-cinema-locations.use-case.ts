import { Inject, Injectable } from '@angular/core';
import {
  CINEMA_LOCATION_REPOSITORY,
  CinemaLocationRepository,
} from '../repositories/cinema-location.repository';
import { CinemaLocation } from '../entities/cinema-location.entity';

@Injectable({ providedIn: 'root' })
export class GetLocationsUseCase {
  constructor(
    @Inject(CINEMA_LOCATION_REPOSITORY)
    private locationRepository: CinemaLocationRepository
  ) {}

  execute(): Promise<CinemaLocation[]> {
    return this.locationRepository.getLocations();
  }
}
