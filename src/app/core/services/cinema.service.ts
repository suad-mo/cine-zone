import { computed, effect, Injectable, signal } from '@angular/core';
import { MOCK_LOCATIONS } from '../mock/mock-locations';
import { MOCK_FILMS } from '../mock/mock-films';
import { Hall, Location, Film, Projection } from '../models';
import { MOCK_PROJECTIONS } from '../mock/mock-projection';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  private _locations = MOCK_LOCATIONS;
  private films = MOCK_FILMS;
  private projections = MOCK_PROJECTIONS;

  // SIGNALI
  selectedLocation = signal<Location | undefined>(this._locations[0]);
  selectedFilm = signal<Film | undefined>(this.films[0]);
  selectedHall = computed(()=> this.selectedLocation()?.halls[0]);

  getLocationByIdLocation(idLocation: number | null): Location | undefined {
    return this._locations.find((l) => l.id === idLocation);
  }


  // COMPUTED signal (derivirana vrijednost)
  projectionsByLocation = computed(() => {
    const loc = this.selectedLocation();
    if (!loc) return [];
    const projs: Projection[] = this.projections.filter(
      (p) => p.locationId === loc.id
    );
    return projs;
  });

  projectionsByFilm = computed(() => {
    const film = this.selectedFilm();
    if (!film) return [];
    const projs: Projection[] = this.projections.filter(
      (p) => p.filmId === film.id
    );
    return projs;
  });


  // signal za sve listu svih filmova
  filmovi = signal<Film[]>(this.films);
  locations = signal<Location[]>(this._locations);

  // API-like metode
  getLocations(): Location[] {
    return this._locations;
  }

  getFilms(): Film[] {
    return this.filmovi();
  }

  getFilmById(filmId: number): Film | undefined {
    return this.films.find((f) => f.id === filmId);
  }

  getProjectionsForFilm(filmId: number): Projection[] {
    this.projections
    return this.projections.filter((p) => p.filmId === filmId);
  }

  getHallsById(hallId: number): Hall[] | undefined {
    return this.selectedLocation()?.halls.filter((h) => h.id === hallId);
  }

  changeSelectedLocation(id: number): void {
    const loc = this._locations.find((l) => l.id === id);
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
