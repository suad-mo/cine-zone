import { computed, Injectable, signal } from '@angular/core';
import { Film } from '../models';
import { MOCK_FILMS } from '../mock/mock-films';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  films = signal<Film[]>(MOCK_FILMS);
  selectedFilmId = signal<number | null>(null);
  // selectedFilm = signal<Film | undefined>(undefined);
  selectedFilm = computed(() => {
    const id = this.selectedFilmId();
    if (id === null) {
      return undefined;
    }
    const film = this.films().find((f) => f.id === id) || undefined;
    return film;
  });

  selectFilmId(id: number | null) {
    this.selectedFilmId.set(id);
  }

  constructor() {}
}
