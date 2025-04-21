import { Injectable, computed, signal } from '@angular/core';
import { Film, Projection } from '../models';
import { MOCK_PROJECTIONS_BY_DAY } from '../mock/mock-projections-by-day';
import { MOCK_FILMS } from '../mock/mock-films';
// import { MOCK_PROJECTIONS_BY_DAY } from '../mock-data/mock-projections-by-day';

@Injectable({ providedIn: 'root' })
export class ProjectionService {
  private readonly _projectionsByDay = signal<Record<string, Projection[]>>(
    MOCK_PROJECTIONS_BY_DAY
  );

  // Trenutni filteri
  readonly selectedDate = signal<string>(
    Object.keys(MOCK_PROJECTIONS_BY_DAY)[0]
  );
  readonly selectedHallId = signal<number | null>(null); // null = sve sale

  // Sirovi podaci
  readonly projectionsByDay = this._projectionsByDay.asReadonly();
  readonly availableDates = computed(() =>
    Object.keys(this._projectionsByDay())
  );

  // Sve projekcije za odabrani dan (nefiltrirane)
  readonly projectionsForSelectedDate = computed(() => {
    const date = this.selectedDate();
    return this._projectionsByDay()[date] || [];
  });

  // Filtrirane projekcije prema sali
  readonly filteredProjections = computed(() => {
    const hallId = this.selectedHallId();
    const all = this.projectionsForSelectedDate();
    return hallId ? all.filter((p) => p.hallId === hallId) : all;
  });

  // Promjena filtera
  setSelectedDate(date: string): void {
    this.selectedDate.set(date);
  }

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

  private readonly _films = signal<Film[]>(MOCK_FILMS);

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
