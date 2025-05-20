import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '../../core/services/cineplexx/cinema.service';
import { TabsModule } from 'primeng/tabs';
import { GridMoviesComponent } from './components/grid-movies/grid-movies.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { SelectCityComponent } from './components/select-city/select-city.component';
import { SelectMonthComponent } from './components/select-month/select-month.component';

@Component({
  selector: 'app-movies',
  imports: [
    GridMoviesComponent,
    SelectDateComponent,
    SelectCityComponent,
    SelectMonthComponent,
    TabsModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  standalone: true,
})
export class MoviesComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly _cinemaService = inject(CinemaService);

  category = this._cinemaService.category;

  date = this._cinemaService.date;
  month = this._cinemaService.month;
  location = this._cinemaService.location;
  queryParams = this._cinemaService.queryParams;

  constructor() {
    const isReadSnapshot = this._isReadSnapshot();
    console.log('isReadSnapshot', isReadSnapshot);

    if (!isReadSnapshot) {
      this._cinemaService.init();
      this.router.navigate([], {
        queryParams: this.queryParams(),
        queryParamsHandling: 'replace',
        replaceUrl: true,
      });
      console.log('CinemaService.init() called');
    }
  }

  ngOnInit(): void {
    //   console.log('CinemaService.init() called');
  }

  ngOnDestroy(): void {
    this._cinemaService.destoy();
    console.log('CinemaService.destoy() called');
  }

  onChange($event: any): void {
    this.router.navigate([], {
      queryParams: this.queryParams(),
      queryParamsHandling: 'replace',
      replaceUrl: true,
    });
  }

  private _isReadSnapshot(): boolean {
    const params = this.route.snapshot.queryParams;
    const category = params['category'];
    const date = params['date'];
    const location = params['location'];

    let isChanged = false;

    effect(
      () => {
        if (
          category !== undefined &&
          category !== null &&
          (category === 'top' || category === 'now' || category === 'upcoming')
        ) {
          this.category.set(category);
          isChanged = true;
        }

        if (
          date !== undefined &&
          date !== null &&
          date !== '' &&
          (date === 'all' || new Date(date).getDay() > 0)
        ) {
          if (category === 'upcoming') {
            this.month.set(date);
            isChanged = true;
          } else if (category === 'now' || category === 'top') {
            this.date.set(date);
            isChanged = true;
          }
        }

        if (location !== undefined && location !== null && location !== '') {
          this.location.set(location);
          isChanged = true;
        }
      },
      { allowSignalWrites: true }
    );
    return isChanged;
  }
}
