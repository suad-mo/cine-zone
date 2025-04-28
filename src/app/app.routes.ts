import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
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
    path: 'reservations/:idProjection',
    loadComponent: () =>
      import('./features/reservation/reservation.page').then(
        (m) => m.ReservationPage
      ),
  },
];
