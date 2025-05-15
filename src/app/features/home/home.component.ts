import { Component, inject, signal } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { CinemaService } from '../../core/services/cinema.service';
import { FilmService } from '../../core/services/film.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HomeEventsComponent } from './components/home-events/home-events.component';
import { Movie } from '../../core/models/cinema';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { MySelectDateComponent } from '../../shared/components/my-select-date/my-select-date.component';
import { HomeTestComponent } from './components/home-test/home-test.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    CarouselModule,
    CardModule,
    ScrollPanelModule,
    HomeEventsComponent,
    MySelectDateComponent,
    HomeTestComponent,
    DropdownModule,
  ],
})
export class HomeComponent {
  readonly films = inject(FilmService).films();
  private readonly _cinemaService = inject(CinemaService);
  readonly movies =this._cinemaService.movies;
  readonly listDate = this._cinemaService.listDate;
  readonly wizard = this._cinemaService.resWizard;

  constructor() {
    this._cinemaService.init();
    // console.log('listDate:', this.listDate());

    // this._cinemaService.updateMovies();
    // this._cinemaService.movies.subscribe((movies) => {
    //   this.movies.set(movies);
    // });
  }
}
