import { Injectable, computed, signal } from '@angular/core';
import { Film, Hall, Location, Projection, Seat } from '../models';
import { MOCK_FILMS } from '../mock/mock-films';
import { MOCK_PROJECTIONS } from '../mock/mock-projection';
import { MOCK_LOCATIONS } from '../mock/mock-locations';
import { MOCK_HALLS } from '../mock/mock_halls';
import { generateSeatMap } from '../utils/seat-generator.utils';

@Injectable({ providedIn: 'root' })
export class ProjectionService {
  private readonly _locations = signal<Location[]>(MOCK_LOCATIONS);
  private readonly _projections = signal<Projection[]>(MOCK_PROJECTIONS);
  private readonly _films = signal<Film[]>(MOCK_FILMS);
  private readonly _halls = signal<Hall[]>(
    MOCK_HALLS.map((h) => {
      const seats = generateSeatMap(h.rows, h.columns);
      return { ...h, seatMap: seats };
    })
  );

  readonly selectedDate = signal<string>('');
  readonly selectedLocationId = signal<number | null>(null);
  readonly selectedProjectionId = signal<number | null>(null);
  readonly selectedFilmId = signal<number | null>(null);
  readonly selectedHallId = signal<number | null>(null);
  // selectedProjectionChanged: any;

  constructor() {}

  resetAll(){
    this.selectedDate.set('');
    this.selectedLocationId.set(null);
    this.selectedProjectionId.set(null);
    this.selectedFilmId.set(null);
    this.selectedHallId.set(null);
  }

  // privte metoda da extracrt date iz dateTime stringa
  private extractDate(dateTime: string): string {
    return dateTime.split('T')[0];
  }

  /** Set selected date */
  setSelectedDate(date: string): void {
    this.selectedDate.set(date);
  }

  /** Set selected location */
  setSelectedLocationId(id: number): void {
    this.selectedLocationId.set(id);
  }

  /** Set selected projection */
  setSelectedProjectionId(id: number): void {
    this.selectedProjectionId.set(id);
    if (id !== null) {
      const projection = this._projections().find((p) => p.id === id);
      if (projection) {
        const dateOnly = projection.dateTime.split('T')[0]; // Odvoji samo datum
        if (this.selectedDate() !== dateOnly) {
          this.selectedDate.set(dateOnly);
        }
        if (this.selectedLocationId() !== projection.locationId) {
          this.selectedLocationId.set(projection.locationId);
        }
        if (this.selectedFilmId() !== projection.filmId) {
          this.selectedFilmId.set(projection.filmId);
        }
        if (this.selectedHallId() !== projection.hallId) {
          this.selectedHallId.set(projection.hallId);
        }
      }
    }
  }

  /** Reset selected projection */
  resetSelectedProjection(): void {
    this.selectedProjectionId.set(null);
  }

  /** Mapping film titles by film id */
  readonly filmTitleMap = computed<Record<number, string>>(() => {
    const map: Record<number, string> = {};
    for (const film of this._films()) {
      map[film.id] = film.title;
    }
    return map;
  });

  /** Get projections grouped by day */
  readonly mapProjectionsByDay = computed<Record<string, Projection[]>>(() => {
    const result: Record<string, Projection[]> = {};
    for (const projection of this._projections()) {
      const date = this.extractDate(projection.dateTime);
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(projection);
    }
    return result;
  });

  /** Get projections grouped by location */
  readonly mapProjectionsByLocation = computed<Record<number, Projection[]>>(
    () => {
      const result: Record<number, Projection[]> = {};
      for (const projection of this._projections()) {
        const locationId = projection.locationId;
        if (!result[locationId]) {
          result[locationId] = [];
        }
        result[locationId].push(projection);
      }
      return result;
    }
  );

  /** Get projections grouped by film */
  readonly mapProjectionsByFilm = computed<Record<number, Projection[]>>(() => {
    const result: Record<number, Projection[]> = {};
    for (const projection of this._projections()) {
      const filmId = projection.filmId;
      if (!result[filmId]) {
        result[filmId] = [];
      }
      result[filmId].push(projection);
    }
    return result;
  });

  /** Get filtered projections for selected date */
  readonly filteredProjectionsByDate = computed<Projection[]>(() => {
    const all = this._projections();
    const date = this.selectedDate();
    if (!date) return all;
    return all.filter((p) => this.extractDate(p.dateTime) === date);
  });

  /** Get filtered projections for selected location */
  readonly filteredProjectionsByLocation = computed<Projection[]>(() => {
    const all = this._projections();
    const locationId = this.selectedLocationId();
    if (!locationId) return all;
    return all.filter((p) => p.locationId === locationId);
  });

  /** Get filtered projections for selected location and date without duplicate films */
  readonly filteredProjectionsByLocationAndDate = computed<Projection[]>(() => {
    const all = this._projections();
    const locationId = this.selectedLocationId();
    const date = this.selectedDate();

    // Ako nema datuma i lokacije, vrati sve projekcije bez duplikata filmova
    if (!locationId && date.length === 0) {
      const uniqueProjections = new Map<number, Projection>();
      for (const projection of all) {
        if (!uniqueProjections.has(projection.filmId)) {
          uniqueProjections.set(projection.filmId, projection);
        }
      }
      return Array.from(uniqueProjections.values());
    }

    // Ako je samo lokacija postavljena
    if (locationId && date.length === 0) {
      const filteredByLocation =
        this.mapProjectionsByLocation()[locationId] ?? [];
      const uniqueProjections = new Map<number, Projection>();
      for (const projection of filteredByLocation) {
        if (!uniqueProjections.has(projection.filmId)) {
          uniqueProjections.set(projection.filmId, projection);
        }
      }
      return Array.from(uniqueProjections.values());
    }
    // Ako je samo datum postavljen
    if (!locationId && date.length > 0) {
      const filteredByDate = this.mapProjectionsByDay()[date] ?? [];
      const uniqueProjections = new Map<number, Projection>();
      for (const projection of filteredByDate) {
        if (!uniqueProjections.has(projection.filmId)) {
          uniqueProjections.set(projection.filmId, projection);
        }
      }
      return Array.from(uniqueProjections.values());
    }
    // Ako su postavljeni i datum i lokacija
    if (locationId && date.length > 0) {
      const filtered = all.filter(
        (p) =>
          p.locationId === locationId && this.extractDate(p.dateTime) === date
      );
      const uniqueProjections = new Map<number, Projection>();
      for (const projection of filtered) {
        if (!uniqueProjections.has(projection.filmId)) {
          uniqueProjections.set(projection.filmId, projection);
        }
      }
      return Array.from(uniqueProjections.values());
    }

    return [];
  });

  /** Get selected projection */
  readonly selectedProjection = computed<Projection | undefined>(() => {
    const id = this.selectedProjectionId();
    if (id === null) return undefined;
    return this._projections().find((p) => p.id === id);
  });
  /** Get selected location */
  readonly selectedLocation = computed(() => {
    const locationId = this.selectedLocationId();
    if (locationId) return this._locations().find((l) => l.id === locationId);
    const projection = this.selectedProjection();
    if (projection)
      return this._locations().find((l) => l.id === projection.locationId);
    return undefined;
  });

  /** Get selected hall */
  readonly selectedHall = computed<Hall | undefined>(() => {
    const hallId = this.selectedHallId();
    if (hallId) return this._halls().find((h) => h.id === hallId);
    const projection = this.selectedProjection();
    if (!projection) return undefined;
    return this._halls().find((h) => h.id === projection.locationId);
  });

  /** Get selected film */
  readonly selectedFilm = computed<Film | undefined>(() => {
    const filmId = this.selectedFilmId();
    if (filmId) return this._films().find((f) => f.id === filmId);
    const projection = this.selectedProjection();
    if (projection)
      return this._films().find((f) => f.id === projection.filmId);
    return undefined;
  });

  /** Get selected seats */
  readonly selectedSeats = computed<Seat[][] | undefined>(() => {
    return this.selectedHall()?.seatMap;
  });

  readonly selectedSeatsProjection = computed<Seat[][] | undefined>(() => {
    return this.selectedProjection()?.seatMap;
  });


  //********************************** */
  //************************************ */

  getProjectionsByIdLocationAndDate(
    idLocatin: number,
    date: string
  ): Projection[] {
    const projections = this.mapProjectionsByDay()[date] || [];
    return projections.filter((p) => p.locationId === idLocatin);
  }

  readonly availableDates = computed(() =>
    Object.keys(this.mapProjectionsByDay())
  );

  readonly availableLocations = computed(() =>
    Object.keys(this.mapProjectionsByLocation).map((id) => parseInt(id, 10))
  );

  // Sve projekcije za odabrani dan (nefiltrirane)
  readonly projectionsForSelectedDate = computed(() => {
    const date = this.selectedDate();
    return this.mapProjectionsByDay()[date] || [];
  });

  // Sve projekcije za odabrani film, lokaciju i datum
  readonly projectionsForSelectedFilm = computed(() => {
    const filmId = this.selectedFilmId();
    const locationId = this.selectedLocationId();
    const date = this.selectedDate();
    if (!filmId) return [];
    if (!locationId && date.length === 0) {
      return this.mapProjectionsByFilm()[filmId] || [];
    }

    // Ako je samo lokacija postavljena
    if (locationId && date.length === 0) {
      return (
        this.mapProjectionsByLocation()[locationId].filter(
          (p) => p.filmId === filmId
        ) || []
      );
    }

    // Ako je samo datum postavljen
    if (!locationId && date.length > 0) {
      return (
        this.mapProjectionsByDay()[date].filter((p) => p.filmId === filmId) ||
        []
      );
    }

    // Ako su postavljeni i datum i lokacija
    if (locationId && date.length > 0) {
      return (
        this.mapProjectionsByDay()[date].filter(
          (p) => p.filmId === filmId && p.locationId === locationId
        ) || []
      );
    }
    return [];
  });

  // Filtrirane projekcije prema sali
  readonly filteredProjections = computed(() => {
    const idLocatin = this.selectedLocationId();
    const all = this.projectionsForSelectedDate();
    if (!idLocatin) return all;
    return all.filter((p) => p.locationId === idLocatin);
  });

  /// Promjena selektovane lokacije
  setSelectedIdLocation(locationId: number | null): void {
    console.log('Selected location ID:', locationId);
    this.selectedLocationId.set(locationId);
  }

  /// Promjena selektovanog filma
  setSelectedIdFilm(filmId: number | null): void {
    this.selectedFilmId.set(filmId);
  }

  /// Promjena selektovane sale
  /// Ako je null, onda su sve sale dostupne
  /// Ako je neki id, onda se filtriraju projekcije samo za tu salu
  setSelectedIdHall(hallId: number | null): void {
    this.selectedHallId.set(hallId);
  }

  setSelectedIdProjection(projectionId: number) {
    this.selectedProjectionId.set(projectionId);
  }

  // Dohvati projekcije za određeni dan
  getProjectionsForDate(date: string): Projection[] {
    return this.mapProjectionsByDay()[date] || [];
  }

  /// Dohvati projekcije za određeni idFilm
  getProjectionByIdFilm(idFilm: number): Projection[] {
    return this._projections().filter((p) => p.filmId === idFilm);
  }

  getFilmTitle(filmId: number): string {
    return this.filmTitleMap()[filmId] ?? 'Nepoznat film';
  }

  getFilmById(filmId: number): Film | undefined {
    return this._films().find((film) => film.id === filmId);
  }
}
