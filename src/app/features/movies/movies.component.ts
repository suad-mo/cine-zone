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
  queryParams =this._cinemaService.queryParams;

  constructor() {
    effect(() => {
      const queryParams = this.queryParams();
      const currentParams = this.route.snapshot.queryParams;
      console.log('currentParams:', currentParams);
      console.log('new queryParams:', queryParams);
      // this.router.navigate([], {
      //   queryParams,
      //   queryParamsHandling: 'replace',
      //   replaceUrl: true,
      // });
      // const category = this.category();
      // console.log('activeIndexCategory:', category);
      // const location = this.location();
      // switch (category) {
      //   case 'top':
      //     this._cinemaService.updateCategory('top');
      //     this.router.navigate([], {
      //       queryParams: {date: this.date(), category, location: this.location() },
      //     });

      //     break;
      //   case 'now':
      //     this._cinemaService.updateCategory('now');
      //     this.router.navigate([], {
      //       queryParams: {date: this.date(), category, location: this.location() },
      //     });
      //     break;
      //   case 'upcoming':
      //     this._cinemaService.updateCategory('upcoming');
      //     console.log('upcoming-month: ', this.month());

      //     this.router.navigate([], {
      //       queryParams: { category, date: this.month() },
      //     });
      //     break;
      //   default:
      //     this.router.navigate([], {
      //       queryParams: {date: this.date(), category: 'now', location: this.location(),
      //       },
      //     });
      //     break;
      // }
    });
  }
  ngOnInit(): void {
    // this._readRouteParams();
    this._cinemaService.init();
    console.log('CinemaService.init() called');

    // const category = this.route.snapshot.queryParams['category'];
    // const date = this.route.snapshot.queryParams['date'];
    // const location = this.route.snapshot.queryParams['location'];
    // console.log(category, date, location);
  }

  ngOnDestroy(): void {
    this._cinemaService.destoy();
    console.log('CinemaService.destoy() called');
  }

  // private _readRouteParams() {
  //   this.route.queryParams.subscribe((params) => {
  //     const category = params['category'] ?? 'now';
  //     const date = params['date'] ?? new Date().toISOString().split('T')[0];
  //     const location = params['location'] ?? 'all';

  //     if (category) {
  //       // this.category.set(category);
  //       switch (category) {
  //         case 'top':
  //           this.activeIndex.set('top');
  //           break;
  //         case 'now':
  //           this.activeIndex.set('now');
  //           break;
  //         case 'upcoming':
  //           this.activeIndex.set('upcoming');
  //           break;
  //         default:
  //           this.activeIndex.set('now');
  //           break;
  //       }
  //     }

  //     if (date) {
  //       this._cinemaService.updateDate(date);
  //     }
  //     if (location) {
  //       this._cinemaService.updateLocation(location);
  //     }
  //   });
  // }
}
