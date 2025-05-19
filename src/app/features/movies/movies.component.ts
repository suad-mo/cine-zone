import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { TabViewModule } from 'primeng/tabview';
// import { SelectDateComponent } from './components/select-date/select-date.component';
import { CinemaService } from '../../core/services/cinema.service';
// import { SelectCityComponent } from './components/select-city/select-city.component';
// import { GridMoviesComponent } from './components/grid-movies/grid-movies.component';
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
    // TabViewModule,
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
  // activeIndex = signal<string>('now');

  category = this._cinemaService.category;

  date = this._cinemaService.date;
  month = this._cinemaService.month;
  location = this._cinemaService.location;
  queryParams = this._cinemaService.queryParams;

  constructor() {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const date = params['date'] ?? this.date();
      const category = params['category'] ?? this.category();
      const location = params['location'] ?? this.location();
      const month = params['month'] ?? this.month();

      this._cinemaService.updateMonth(date);

      this._cinemaService.updateDate(date);

      this._cinemaService.updateCategory(category);
      this._cinemaService.updateLocation(location);
    });
    this._cinemaService.init();
    console.log('CinemaService.init() called');
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
}
