import { Injectable, computed, signal } from '@angular/core';
import { Film, Location, Projection } from '../models';
import {
  MOCK_PROJECTIONS_BY_DAY,
  MOCK_PROJECTIONS_BY_LOCATION,
} from '../mock/mock-projections-by-day';
import { MOCK_FILMS } from '../mock/mock-films';
import { MOCK_PROJECTIONS } from '../mock/mock-projection';
import { MOCK_LOCATIONS } from '../mock/mock-locations';
// import { MOCK_PROJECTIONS_BY_DAY } from '../mock-data/mock-projections-by-day';

@Injectable({ providedIn: 'root' })
export class ProjectionService {
  private readonly _locations = signal<Location[]>(MOCK_LOCATIONS);
  private readonly _projections = signal<Projection[]>(MOCK_PROJECTIONS);
  private readonly _projectionsByDay = signal<Record<string, Projection[]>>(
    MOCK_PROJECTIONS_BY_DAY
  );
  private readonly _projectionsByLocation = signal<
    Record<number, Projection[]>
  >(MOCK_PROJECTIONS_BY_LOCATION);

  private readonly _films = signal<Film[]>(MOCK_FILMS);

  getProjectionsByIdLocationAndDate(
    idLocatin: number,
    date: string
  ): Projection[] {
    const projections = this._projectionsByDay()[date] || [];
    return projections.filter((p) => p.locationId === idLocatin);
  }

  private readonly _projectionsByLocationUnique = signal<
    Record<number, Projection[]>
  >(MOCK_PROJECTIONS_BY_LOCATION);

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

  // Sirovi podaci
  readonly projectionsByDay = this._projectionsByDay.asReadonly();
  // svi dostupni datumi projekcija
  readonly availableDates = computed(() =>
    Object.keys(this._projectionsByDay())
  );

  readonly availableLocations = computed(() =>
    Object.keys(this._projectionsByLocation).map((id) => parseInt(id, 10))
  );

  readonly selectedLocation = computed(() => {
    const idLocation = this.selectedLocationId();
    return this._locations().find((l) => l.id === idLocation);
  });
  // Sve projekcije za odabrani dan (nefiltrirane)
  readonly projectionsForSelectedDate = computed(() => {
    const date = this.selectedDate();
    return this._projectionsByDay()[date] || [];
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
        p.dateTime.split("T")[0] === date &&
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
  setSelectedLocation(locationId: number | null): void {
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
  setSelectedHall(hallId: number | null): void {
    this.selectedHallId.set(hallId);
  }

  // Dohvati projekcije za određeni dan
  getProjectionsForDate(date: string): Projection[] {
    return this._projectionsByDay()[date] || [];
  }
  // Postavi novo stanje ako trebaš dinamički mijenjati podatke
  setProjectionsForDate(date: string, projections: Projection[]): void {
    const updated = { ...this._projectionsByDay() };
    updated[date] = projections;
    this._projectionsByDay.set(updated);
  }

  // Dohvati projekcije za određenu lokaciju
  getProjectionsForLocation(locationId: number): Projection[] {
    return this._projectionsByLocationUnique()[locationId] || [];
  }

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
