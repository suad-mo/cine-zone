import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CinemaLocationRepository } from '../core/repositories/cinema-location.repository';
import { CinemaLocation } from '../core/entities/cinema-location.entity';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpCinemaLocationService implements CinemaLocationRepository {
  private readonly locationsUrl = 'https://app.cineplexx.ba/api/v1/locations';

  constructor(private http: HttpClient) {}

  getLocations(): Promise<CinemaLocation[]> {
    return lastValueFrom(
      this.http.get<CinemaLocation[]>(this.locationsUrl).pipe(
        map((locations) => {
          return locations;
        }),
        catchError((error) => {
          console.error('Error fetching cinema locations:', error);
          throw new Error('Failed to fetch cinema locations');
        })
      )
    );
  }
}
