import { HttpMovieService } from '../../infrastructure/http-movie.service';
import { CINEMA_LOCATION_REPOSITORY } from '../../core/repositories/cinema-location.repository';
import { DISPLAY_MODE_REPOSITORY } from '../../core/repositories/display-mode.repository';
import { MOVIE_REPOSITORY } from '../../core/repositories/movie.repository';
import { HttpCinemaLocationService } from '../../infrastructure/http-cinema-location.service';
import { HttpModeService } from '../../infrastructure/http-display-mode.service';
import { MoviesState } from '../../infrastructure/state/movie.state';

export const provideMovieFeature = () => [
  { provide: MOVIE_REPOSITORY, useClass: HttpMovieService }, // multi: false},
  { provide: DISPLAY_MODE_REPOSITORY, useClass: HttpModeService }, // multi: false},
  { provide: CINEMA_LOCATION_REPOSITORY, useClass: HttpCinemaLocationService },
  MoviesState,
];
