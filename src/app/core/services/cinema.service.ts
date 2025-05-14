import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, ResponseWizard } from '../models/cinema';
import { SeatPlan } from '../models/cineplexx/seat-plan';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrlV1 = 'https://app.cineplexx.ba/api/v2/'; //movies';
  private readonly apiUrlV2 = 'https://app.cineplexx.ba/api/v1/cinemas';
  // https://app.cineplexx.ba/api/v2/movies/filters/dates/list?location=all
  //https://app.cineplexx.ba/api/v1/sessions/1182-45455
  // 	https://app.cineplexx.ba/static/area_categories/free.svg za svg filove

  movies = signal<Movie[]>([]);
  loc = signal<string>('all');
  date = signal<string>(new Date().toISOString().split('T')[0]);
  listDate = signal<string[]>([]);
  resWizard = signal<ResponseWizard | null>(null);
  seatPlan = signal<SeatPlan | null>(null);

  constructor() {}

  init() {
    this._updateListDate();
    this._updateMovies();
    this._updateResponsWizard();
    this._updateSeatPlan();
  }

  updateDate(date: string) {
    this.date.set(date);
    this._updateMovies();
  }

  updateLocation(location: string) {
    this.loc.set(location);
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

  private _updateResponsWizard() {
    const url = 'https://app.cineplexx.ba/api/v1/sessions/1182-45614';
    this.http.get<ResponseWizard>(url).subscribe((data) => {
      this.resWizard.set(data);
    });
  }

  private _updateSeatPlan() {
    const url = 'https://app.cineplexx.ba/api/v1/seat-plan/1182/45614';
    this.http.get<SeatPlan>(url).subscribe((data) => {
      this.seatPlan.set(data);
    });
  }

}
