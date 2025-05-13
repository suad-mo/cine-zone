import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MOCK_LOCATIONS } from '../mock/mock-locations';
import { MOCK_FILMS } from '../mock/mock-films';
import { Hall, Location, Film, Projection } from '../models';
import { MOCK_PROJECTIONS } from '../mock/mock-projection';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/cinema';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrlV1 = 'https://app.cineplexx.ba/api/v2/'; //movies';
  private readonly apiUrlV2 = 'https://app.cineplexx.ba/api/v1/cinemas';
  // https://app.cineplexx.ba/api/v2/movies/filters/dates/list?location=all
  private _locations = MOCK_LOCATIONS;
  private films = MOCK_FILMS;
  private projections = MOCK_PROJECTIONS;

  movies = signal<Movie[]>([]);
  loc = signal<string>('all');
  date = signal<string>('2025-05-14'); // new Date().toISOString().split('T')[0]
  // date = signal<string>(new Date().toISOString().split('T')[0]);
  listDate = signal<string[]>([]);
  constructor() {
    // let timeout: any;
    // effect(() => {
    //   clearTimeout(timeout);
    //   timeout = setTimeout(() => {
    //     const date = this.date();
    //     const location = this.loc();
    //     this._updateMovies();
    //     console.log('Date:', date);
    //     console.log('Location:', location);
    //     console.log('Movies:', this.movies());
    //   }, 300); // Debounce time in milliseconds
    // });
    // effect(() => {
    //   const date = this.date();
    //   const location = this.loc();
    //   this.updateMovies();
    //   console.log('Date:', date);
    //   console.log('Location:', location);
    //   console.log('Movies:', this.movies());
    // });
  }

  init() {
    this._updateListDate();
    this._updateMovies();
  }
  updateDate(date: string) {
    this.date.set(date);
    this._updateMovies();
  }
  private _updateMovies() {
    const url =
      `${this.apiUrlV1}movies?date=${this.date()}&location=${this.loc()}`;

    this.http.get<Movie[]>(url).subscribe((data) => {
      this.movies.set(data);
    });
  }

  private _updateListDate() {
    const url = `${this.apiUrlV1}movies/filters/dates/list?location=${this.loc()}`;
    this.http.get<string[]>(url).subscribe((data) => {
      this.listDate.set(data);
    });
  }
  // // SIGNALI
  // selectedLocation = signal<Location | undefined>(this._locations[0]);
  // selectedFilm = signal<Film | undefined>(this.films[0]);
  // // selectedHall = computed(()=> this.selectedLocation()?.halls[0]);

  // getLocationByIdLocation(idLocation: number | null): Location | undefined {
  //   return this._locations.find((l) => l.id === idLocation);
  // }

  // // COMPUTED signal (derivirana vrijednost)
  // projectionsByLocation = computed(() => {
  //   const loc = this.selectedLocation();
  //   if (!loc) return [];
  //   const projs: Projection[] = this.projections.filter(
  //     (p) => p.locationId === loc.id
  //   );
  //   return projs;
  // });

  // projectionsByFilm = computed(() => {
  //   const film = this.selectedFilm();
  //   if (!film) return [];
  //   const projs: Projection[] = this.projections.filter(
  //     (p) => p.filmId === film.id
  //   );
  //   return projs;
  // });

  // // signal za sve listu svih filmova
  // filmovi = signal<Film[]>(this.films);
  // locations = signal<Location[]>(this._locations);

  // // API-like metode
  // getLocations(): Location[] {
  //   return this._locations;
  // }

  // getFilms(): Film[] {
  //   return this.filmovi();
  // }

  // getFilmById(filmId: number): Film | undefined {
  //   return this.films.find((f) => f.id === filmId);
  // }

  // getProjectionsForFilm(filmId: number): Projection[] {
  //   this.projections
  //   return this.projections.filter((p) => p.filmId === filmId);
  // }

  // getHallsById(hallId: number): Hall[] | undefined {
  //   return this.selectedLocation()?.halls.filter((h) => h.id === hallId);
  // }

  // changeSelectedLocation(id: number): void {
  //   const loc = this._locations.find((l) => l.id === id);
  //   if (loc) {
  //     this.selectedLocation.set(loc);
  //   }
  // }
}
