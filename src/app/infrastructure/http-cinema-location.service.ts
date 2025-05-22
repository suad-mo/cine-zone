import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CinemaLocationRepository } from "../core/repositories/cinema-location.repository";
import { CinemaLocation } from "../core/entities/cinema-location.entity";
import { lastValueFrom } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class HttpCinemaLocationService implements CinemaLocationRepository {
  private readonly locationsUrl = 'https://app.cineplexx.ba/api/v1/locations'

  constructor(private http: HttpClient) {}

  getLocations(): Promise<CinemaLocation[]> {
    return lastValueFrom(
      this.http.get<CinemaLocation[]>(this.locationsUrl).pipe(
        map(locations => [
          { id: -1, name: 'all cinema' } as CinemaLocation,
          ...locations
        ])
      )
    );
  }
}
