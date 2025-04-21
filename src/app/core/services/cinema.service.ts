import { computed, effect, Injectable, signal } from '@angular/core';
import { MOCK_LOCATIONS } from '../mock/mock-locations';
import { MOCK_FILMS } from '../mock/mock-films';
import { Hall, Location, Film, Projection } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private location = MOCK_LOCATIONS;
  private films = MOCK_FILMS;

  // SIGNALI
  selectedLocation = signal<Location>(this.location[0]);

  // COMPUTED signal (derivirana vrijednost)
  projections = computed (() => {
    const loc = this.selectedLocation();
    const allProjection: Projection[] = [];
    loc.halls.forEach(hall => allProjection.push(...hall.projections));
    return allProjection;
  });
  // signal za sve listu svih filmova
  filmovi = signal<Film[]>(this.films);

  // API-like metode
  getLocations(): Location[] {
    return this.location;
  }

  getFilms(): Film[] {
    return this.filmovi();
  }

  getProjectionsForFilm(filmId: number): Projection[] {
    return this.projections().filter((p) => p.filmId === filmId);
  }

  getHallById(hallId: number): Hall[] {
    return this.selectedLocation().halls.filter((h) => h.id === hallId);
  }

  changeSelectedLocation(id: number): void {
    const loc = this.location.find((l) => l.id === id);
    if (loc) {
      this.selectedLocation.set(loc);
    }
  }

  constructor() {
    effect(() => {
      console.log('Lokacija promjenjena na:', this.selectedLocation());
    });
  }
}
