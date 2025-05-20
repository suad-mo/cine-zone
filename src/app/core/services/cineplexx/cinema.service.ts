import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Cinema, Movie, ResponseWizard } from '../../models/cineplexx/cinema';
import { SeatPlan, SeatWithIcon } from '../../models/cineplexx/seat-plan';
import { City } from '../../models/cineplexx/city';


@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrlV1 = 'https://app.cineplexx.ba/api/v1/'; //movies';
  private readonly apiUrlV2 = 'https://app.cineplexx.ba/api/v2/';

  private readonly _subs: Subscription[] = [];

  movies = signal<Movie[]>([]);
  movie = signal<Movie | null>(null);

  date = signal<string>(new Date().toISOString().split('T')[0]);
  month = signal<string>('all');
  location = signal<string>('all');
  category = signal<string>('now');

  listDate = signal<string[]>([]);
  listMonth = signal<string[]>([]);
  listLoc = signal<City[]>([]);
  listCinema = signal<Cinema[]>([]);

  resWizard = signal<ResponseWizard | null>(null);
  seatPlan = signal<SeatPlan | null>(null);
  queryParams = computed<{
    date?: string;
    category: string;
    location?: string;
  }>(() => {
    const date = this.date();
    const month = this.month();
    const location = this.location();
    const category = this.category();

    const params = <{ date?: string; category: string; location?: string }>{
      date:
        category !== 'upcoming' ? date : month === 'all' ? undefined : month,
      category,
      location: category !== 'upcoming' ? location : undefined,
    };
    return params;
  });

  seatIcons = computed(() => {
    const seatPlan = this.seatPlan();
    if (!seatPlan) {
      return [];
    }
    const icons = seatPlan.icons;
    const seats = seatPlan.rows.map((row) => {
      console.log('row:', row);

      return row.seats
        .map((seat) => {
          const icon = icons.find((icon) => icon.id === seat.seatIconId);
          return <SeatWithIcon>{
            ...seat,
            icon: icon ? 'https://app.cineplexx.ba' + icon.imageUrl : null,
          };
        })
        .reverse();
    });
    return seats;
  });

  mapRowName = computed(() => {
    const mapRows: Record<number, SeatWithIcon[]> = {};
    const seatPlan = this.seatPlan();
    if (!seatPlan) {
      return mapRows;
    }
    const icons = seatPlan.icons;
    seatPlan.rows
      .sort((a, b) => Number(a.physicalName) - Number(b.physicalName))
      .forEach((row) => {
        const rowName = Number(row.physicalName);
        const seats = row.seats.reverse().map((seat) => {
          const icon = icons.find((icon) => icon.id === seat.seatIconId);
          return <SeatWithIcon>{
            ...seat,
            icon: icon ? 'https://app.cineplexx.ba' + icon.imageUrl : null,
          };
        });
        if (mapRows[rowName] && mapRows[rowName].length > 0) {
          mapRows[rowName] = [...mapRows[rowName], ...seats];
        } else {
          mapRows[rowName] = seats;
        }
      });

    // Sort mapRows by key (rowName) in ascending order
    const sortedMapRows = Object.fromEntries(
      Object.entries(mapRows).sort(
        ([keyA], [keyB]) => Number(keyA) - Number(keyB)
      )
    );

    console.log('sortedMapRows:', sortedMapRows);
    return sortedMapRows;
  });

  constructor() {
    effect(() => {
      const { date, category, location } = this.queryParams();
      if (category === 'upcoming') {
        this._updateListMonth();
      } else {
        this._updateListDate();
      }
      this._updateMovies();
    });
  }

  init() {
    this._updateListDate();
    this._updateListMonth();
    this._initListLoc();
    this._initListCinemas();
    this._updateMovies();
  }

  destoy() {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  updateDate(date: string) {
    this.date.set(date);
    this._updateMovies();
  }
  updateMonth(date: string) {
    this.month.set(date);
    console.log('updateMonth:', date);
    this._updateMovies();
  }

  updateLocation(location: string) {
    this.location.set(location);
    this._updateMovies();
    this._updateListDate();
  }

  updateCategory(category: string) {
    this.category.set(category);
    if (category === 'upcoming') {
      this._updateListMonth();
    } else {
      this._updateListDate();
    }
    this._updateMovies();
  }


  private _initListLoc() {
    const url = `${this.apiUrlV1}locations`;
    const sub = this.http.get<City[]>(url).subscribe((data) => {
      this.listLoc.set(data);
    });
    this._subs.push(sub);
  }
  private _initListCinemas() {
    const url = `${this.apiUrlV1}cinemas`;
    const sub = this.http.get<Cinema[]>(url).subscribe((data) => {
      this.listCinema.set(data);
    });
    this._subs.push(sub);
  }
  private _updateMovies() {
    const apiUrl = this.apiUrlV2;
    const category = this.category();
    const date = this.date();
    const month = this.month();
    const location = this.location();
    let url = `${apiUrl}movies?date=${date}&location=${location}`;
    if (category === 'top') {
      url = `${apiUrl}movies/top?date=${date}&location=${location}`;
    } else if (category === 'upcoming') {
      url = `${apiUrl}movies/coming-soon?${
        month !== 'all' ? 'date=' + month : ''
      }&location=${location}`;
    }
    const sub = this.http.get<Movie[]>(url).subscribe((data) => {
      this.movies.set(data);
    });
    this._subs.push(sub);
  }

  private _updateListDate() {
    const category = this.category();
    if (category === 'upcoming') return;
    const location = this.location();
    const apiUrl = `${this.apiUrlV2}movies/filters/dates/list`;
    let url = `${apiUrl}?location=${location}`;
    if (category === 'top') {
      url = `${apiUrl}?top=true&location=${location}`;
    }
    const sub = this.http.get<string[]>(url).subscribe((data) => {
      if (data === this.listDate()) return;
      this.listDate.set(data);
      const oldDate = this.date();
      if (data.map((d) => d.split('T')[0]).includes(oldDate)) {
        return;
      }
      const d = data[0].split('T')[0];
      this.date.set(d);
    });
    this._subs.push(sub);
  }

  private _updateListMonth() {
    const apiUrl = `${this.apiUrlV2}movies/filters/months/list`;
    const category = this.category();
    const url = `${apiUrl}?comingSoon=true`;
    const sub = this.http.get<string[]>(url).subscribe((data) => {
      if (data === this.listMonth()) return;
      data = ['all', ...data];
      // data.unshift('all');
      this.listMonth.set(data);
      const oldDate = this.month();
      if (data.map((d) => d.split('T')[0]).includes(oldDate)) {
        return;
      }
      const d = data[0].split('T')[0];
      this.month.set(d);
    });
    this._subs.push(sub);
  }

  private _updateResponsWizard() {
    const url = 'https://app.cineplexx.ba/api/v1/sessions/1182-45540'; //45619';//1182/45619
    const sub = this.http.get<ResponseWizard>(url).subscribe((data) => {
      this.resWizard.set(data);
    });
    this._subs.push(sub);
  }

  private _updateSeatPlan() {
    const url = 'https://app.cineplexx.ba/api/v1/seat-plan/1182/45540'; //45619';//1182/45619
    const sub = this.http.get<SeatPlan>(url).subscribe((data) => {
      this.seatPlan.set(data);
    });
    this._subs.push(sub);
  }

  private _getMovieById(id: string) {
    const url = `${this.apiUrlV1}movies/${id}`;
    const sub = this.http.get<Movie>(url).subscribe((data) => {
      this.movies.set([data]);
    });
    this._subs.push(sub);
  }
}
