import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { CinemaService } from '../../core/services/cinema.service';
import { SelectCityComponent } from './components/select-city/select-city.component';
import { GridMoviesComponent } from './components/grid-movies/grid-movies.component';

@Component({
  selector: 'app-movies',
  imports: [
    GridMoviesComponent,
    SelectDateComponent,
    SelectCityComponent,
    TabViewModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  standalone: true,
})
export class MoviesComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly _cinemaService = inject(CinemaService);
  activeIndex = signal<number>(1);
  category = this._cinemaService.category;
  date = this._cinemaService.date;
  location = this._cinemaService.location;

  constructor() {
    this._cinemaService.init();
    effect(() => {
      const index = this.activeIndex();
      let category = this.category();
      switch (index) {
        case 0:
          this.router.navigate([], {
            queryParams: { category: 'top' },
            queryParamsHandling: 'merge',
          });
          this._cinemaService.updateCategory('top');
          break;
        case 1:
          this.router.navigate([], {
            queryParams: { category: 'now' },
            queryParamsHandling: 'merge',
          });
          this._cinemaService.updateCategory('now');
          break;
        case 2:
          this.router.navigate([], {
            queryParams: { category: 'upcoming', date: 'all' },
            // queryParamsHandling: 'merge',
          });
          this._cinemaService.updateCategory('upcoming');
          break;
        default:
          this.router.navigate([], {
            queryParams: { tab: 'films' },
            queryParamsHandling: 'merge',
          });
          break;
      }
    });
  }
  ngOnInit(): void {
    const category = this.route.snapshot.queryParams['category'];
    const date = this.route.snapshot.queryParams['date'];
    const location = this.route.snapshot.queryParams['location'];
    console.log(category, date, location);
  }
}
