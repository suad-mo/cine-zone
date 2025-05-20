import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CinemaService } from '../../../../core/services/cineplexx/cinema.service';
import { Movie } from '../../../../core/models/cineplexx/cinema';

@Component({
  selector: 'app-grid-movies',
  imports: [CommonModule, RouterModule],
  templateUrl: './grid-movies.component.html',
  styleUrl: './grid-movies.component.scss'
})
export class GridMoviesComponent {
  private readonly _cinemaService = inject(CinemaService);
  movies = this._cinemaService.movies;


  onMovieClick(movie: Movie){

  }
}
