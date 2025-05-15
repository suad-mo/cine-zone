import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { CinemaService } from '../../../../core/services/cinema.service';
import { SeatWithIcon } from '../../../../core/models/cineplexx/seat-plan';

@Component({
  selector: 'app-home-test',
  imports: [CommonModule],
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.scss',
})
export class HomeTestComponent {
  private readonly _cinemaService = inject(CinemaService);
  readonly seatPlan = this._cinemaService.seatPlan;
  readonly seatIcons = this._cinemaService.seatIcons;
  readonly mapRowName = this._cinemaService.mapRowName;

  lstRows = computed(() => {
    const lst = Object.entries(this.mapRowName()).map(([key, value]) => ({
      key: Number(key),
      value: value,
      }));
    return lst ?? [];

  });

  readonly row = computed(() => {
    const row = this.seatPlan()?.rows[0] ?? null;
    return row;
  });

  readonly listIcon = computed(() => [
    'https://app.cineplexx.ba/static/area_categories/free.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied-double.svg',
  ]);

  readonly list: string[] = [
    'https://app.cineplexx.ba/static/area_categories/free.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied-double.svg',
  ];
  constructor() {
    console.log('mapRowName:', this.mapRowName());
  }

  getObjectValues(arg0: Record<string, SeatWithIcon[]>): SeatWithIcon[][] {
    return Object.values(arg0);
  }

  sortKeysAscending = (a: { key: number }, b: { key: number }): number => {
    return a.key - b.key;
  };
}
