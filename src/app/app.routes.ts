import { Routes } from '@angular/router';
import { MoviePageComponent } from './presentation/movie-page/movie-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'my-movies', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./features/movies/movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: 'movies/:idMovie',
    loadComponent: () =>
      import('./features/movie/movie.component').then(
        (m) => m.MovieComponent
      ),
  },
  {
    path: 'films',
    loadComponent: () =>
      import('./features/films/components/film-list/film-list.component').then(
        (m) => m.FilmListComponent
      ),
  },
  {
    path: 'film/:idFilm',
    loadComponent: () =>
      import(
        './features/films/components/film-details/film-details.component'
      ).then((m) => m.FilmDetailsComponent),
  },
  {
    path: 'projections',
    loadComponent: () =>
      import(
        './features/projections/components/projections/projections.component'
      ).then((m) => m.ProjectionsComponent),
  },
  {
    path: 'reservations/new',
    loadComponent: () =>
      import('./features/reservation/reservation.page').then(
        (m) => m.ReservationPage
      ),
  },
  {
    path: 'my-reservations',
    loadComponent: () =>
      import(
        './features/reservation/my-reservations/my-reservations.component'
      ).then((m) => m.MyReservationsComponent),
  },
  {
    path: 'my-movies',
    loadComponent: () =>
      import('./presentation/movie-page/movie-page.component').then(
        (m) => m.MoviePageComponent
      ),
    // component: MoviePageComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];
