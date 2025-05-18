import { Component, inject } from '@angular/core';
import { CinemaService } from '../../../../core/services/cinema.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-movies',
  imports: [CommonModule],
  templateUrl: './grid-movies.component.html',
  styleUrl: './grid-movies.component.scss'
})
export class GridMoviesComponent {
  private readonly _cinemaService = inject(CinemaService);
  movies = this._cinemaService.movies;
}
