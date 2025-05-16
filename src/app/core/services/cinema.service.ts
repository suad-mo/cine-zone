import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, ResponseWizard } from '../models/cinema';
import { SeatPlan, SeatWithIcon } from '../models/cineplexx/seat-plan';
import { se } from 'date-fns/locale';
import { map } from 'rxjs';

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

  seatIcons = computed(() => {
    const seatPlan = this.seatPlan();
    if (!seatPlan) {
      return [];
    }
    const icons = seatPlan.icons;
    const seats = seatPlan.rows.map((row) => {
      console.log('row:', row);

      return row.seats.map((seat) => {
        const icon = icons.find((icon) => icon.id === seat.seatIconId);
        return <SeatWithIcon>{
          ...seat,
          icon: icon ? "https://app.cineplexx.ba"+ icon.imageUrl : null,
        };
      }).reverse();
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
            icon: icon ? "https://app.cineplexx.ba" + icon.imageUrl : null,
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
      Object.entries(mapRows).sort(([keyA], [keyB]) => Number(keyA) - Number(keyB))
    );

    console.log('sortedMapRows:', sortedMapRows);
    return sortedMapRows;
  });


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
    const url = `${
      this.apiUrlV1
    }movies?date=${this.date()}&location=${this.loc()}`;

    this.http.get<Movie[]>(url).subscribe((data) => {
      this.movies.set(data);
    });
  }

  private _updateListDate() {
    const url = `${
      this.apiUrlV1
    }movies/filters/dates/list?location=${this.loc()}`;
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
    const url = 'https://app.cineplexx.ba/api/v1/seat-plan/1182/45540';//45619';//1182/45619
    this.http.get<SeatPlan>(url).subscribe((data) => {
      this.seatPlan.set(data);
    });
  }
}
