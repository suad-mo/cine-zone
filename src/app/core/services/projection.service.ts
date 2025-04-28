import { Injectable, computed, signal } from '@angular/core';
import { Film, Hall, Location, Projection } from '../models';
import {
  MOCK_PROJECTIONS_BY_DAY,
  MOCK_PROJECTIONS_BY_LOCATION,
} from '../mock/mock-projections-by-day';
import { MOCK_FILMS } from '../mock/mock-films';
import { MOCK_PROJECTIONS } from '../mock/mock-projection';
import { MOCK_LOCATIONS } from '../mock/mock-locations';
import { MOSK_HALLS } from '../mock/mock_halls';
// import { MOCK_PROJECTIONS_BY_DAY } from '../mock-data/mock-projections-by-day';

@Injectable({ providedIn: 'root' })
export class ProjectionService {
  private readonly _locations = signal<Location[]>(MOCK_LOCATIONS);
  private readonly _projections = signal<Projection[]>(MOCK_PROJECTIONS);

  mapProjectionsByDay = computed(() => {
    const mapProjections: Record<string, Projection[]> = {};
    this._projections().forEach((p) => {
      const date = p.dateTime.split('T')[0];
      if (!mapProjections[date]) {
        mapProjections[date] = [];
      }
      mapProjections[date].push(p);
    });
    return mapProjections;
  });

  mapProjectionsByLocation = computed(() => {
    const mapProjections: Record<number, Projection[]> = {};
    this._projections().forEach((p) => {
      if (!mapProjections[p.locationId]) {
        mapProjections[p.locationId] = [];
      }
      mapProjections[p.locationId].push(p);
    });
    return mapProjections;
  });

  mapProjectionsByFilm = computed(() => {
    const mapProjections: Record<number, Projection[]> = {};
    this._projections().forEach((p) => {
      if (!mapProjections[p.filmId]) {
        mapProjections[p.filmId] = [];
      }
      mapProjections[p.filmId].push(p);
    });
    return mapProjections;
  });

  private readonly _films = signal<Film[]>(MOCK_FILMS);
  private readonly _halls = signal<Hall[]>(MOSK_HALLS);

  getProjectionsByIdLocationAndDate(
    idLocatin: number,
    date: string
  ): Projection[] {
    const projections = this.mapProjectionsByDay()[date] || [];
    return projections.filter((p) => p.locationId === idLocatin);
  }

  // private readonly _projectionsByLocationUnique = signal<
  //   Record<number, Projection[]>
  // >(MOCK_PROJECTIONS_BY_LOCATION);

  // Trenutni odabrani datum
  readonly selectedDate = signal<string>(
    Object.keys(MOCK_PROJECTIONS_BY_DAY)[0]
  );
  readonly selectedHallId = signal<number | null>(null); // null = sve sale

  readonly selectedLocationId = signal<number | null>(
    parseInt(Object.keys(MOCK_PROJECTIONS_BY_LOCATION)[0], 10)
  );

  /// Selektovani film, podrazumevano je null
  readonly selectedFilmId = signal<number | null>(null);

  /// Selektovana projekcija, podrazumevano je null
  readonly selectedProjectionId = signal<number | null>(null);

  // // Sirovi podaci
  // readonly projectionsByDay = this.mapProjectionsByDay.asReadonly();
  // svi dostupni datumi projekcija
  readonly availableDates = computed(() =>
    Object.keys(this.mapProjectionsByDay())
  );

  readonly availableLocations = computed(() =>
    Object.keys(this.mapProjectionsByLocation).map((id) => parseInt(id, 10))
  );

  readonly selectedLocation = computed(() => {
    const idLocation = this.selectedLocationId();
    return this._locations().find((l) => l.id === idLocation);
  });

  // Selektovana prrojekcija
  readonly selectedProjection = computed(() => {
    const projectionId = this.selectedProjectionId();
    if (!projectionId) return undefined;

    const projection = this._projections().find((p) => p.id === projectionId);
    if (!projection) return undefined;

    if (this.selectedDate() !== projection.dateTime.split('T')[0]) {
      this.selectedDate.set(projection.dateTime.split('T')[0]);
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

    return projection;
  });

  readonly selectedSeats = computed(() => {
    const projection = this.selectedProjection();
    if (!projection) return undefined;
    return projection.seatMap;
  });

  // Selektovana dvorana
  readonly selectedHall = computed(() => {
    const hallId = this.selectedHallId();
    return this._halls().find((h) => h.id === hallId);
  });

  // Sve projekcije za odabrani dan (nefiltrirane)
  readonly projectionsForSelectedDate = computed(() => {
    const date = this.selectedDate();
    return this.mapProjectionsByDay()[date] || [];
  });

  // Film koji se trenutno gleda
  readonly selectedFilm = computed(() => {
    const filmId = this.selectedFilmId();
    if (!filmId) return undefined;
    return this._films().find((f) => f.id === filmId);
  });

  // Sve projekcije za odabrani film, lokaciju i datum
  readonly projectionsForSelectedFilm = computed(() => {
    const filmId = this.selectedFilmId();
    if (!filmId) return [];
    const locationId = this.selectedLocationId();
    const date = this.selectedDate();
    console.log('Selected film ID:', filmId);
    console.log('Selected date:', date);
    console.log('Selected location ID:', locationId);
    return this._projections().filter(
      (p) =>
        p.dateTime.split('T')[0] === date &&
        p.locationId === locationId &&
        p.filmId === filmId
    );
  });

  // Filtrirane projekcije prema sali
  readonly filteredProjections = computed(() => {
    const idLocatin = this.selectedLocationId();
    const all = this.projectionsForSelectedDate();
    if (!idLocatin) return all;
    return all.filter((p) => p.locationId === idLocatin);
  });

  // Filtrirane projekcije prema lokaciji
  readonly filteredProjectionsByLocation = computed(() => {
    const locationId = this.selectedLocationId();
    const all = this.projectionsForSelectedDate();
    if (!locationId) return all;
    return locationId ? all.filter((p) => p.locationId === locationId) : all;
  });

  // Promjena filtera
  setSelectedDate(date: string): void {
    console.log('Selected date:', date);
    this.selectedDate.set(date);
  }

  /// Promjena selektovane lokacije
  setSelectedIdLocation(locationId: number | null): void {
    console.log('Selected location ID:', locationId);
    this.selectedLocationId.set(locationId);
  }

  /// Promjena selektovanog filma
  setSelectedIdFilm(filmId: number | null): void {
    console.log('Selected film ID:', filmId);
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
    console.log('Selected projection ID:', projectionId);
  }

  // Dohvati projekcije za određeni dan
  getProjectionsForDate(date: string): Projection[] {
    return this.mapProjectionsByDay()[date] || [];
  }
  // Postavi novo stanje ako trebaš dinamički mijenjati podatke
  // setProjectionsForDate(date: string, projections: Projection[]): void {
  //   const updated = { ...this.mapProjectionsByDay() };
  //   updated[date] = projections;
  //   this.mapProjectionsByDay.set(updated);
  // }

  // Dohvati projekcije za određenu lokaciju
  // getProjectionsForLocation(locationId: number): Projection[] {
  //   return this._projectionsByLocationUnique()[locationId] || [];
  // }

  /// Dohvati projekcije za određeni idFilm
  getProjectionByIdFilm(idFilm: number): Projection[] {
    return this._projections().filter((p) => p.filmId === idFilm);
  }

  // Mapiranje filmId -> naziv
  readonly filmTitleMap = computed(() =>
    this._films().reduce((map, film) => {
      map[film.id] = film.title;
      return map;
    }, {} as Record<number, string>)
  );

  getFilmTitle(filmId: number): string {
    return this.filmTitleMap()[filmId] ?? 'Nepoznat film';
  }

  getFilmById(filmId: number): Film | undefined {
    return this._films().find((film) => film.id === filmId);
  }
}
