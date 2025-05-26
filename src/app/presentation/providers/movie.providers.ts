import { HttpMoviesService } from '../../infrastructure/http-movies.service';
import { CINEMA_LOCATION_REPOSITORY } from '../../core/repositories/cinema-location.repository';
import { DISPLAY_MODE_REPOSITORY } from '../../core/repositories/display-mode.repository';
import { MOVIES_REPOSITORY } from '../../core/repositories/movie.repository';
import { HttpCinemaLocationService } from '../../infrastructure/http-cinema-location.service';
import { HttpModeService } from '../../infrastructure/http-display-mode.service';
import { MoviesState } from '../../infrastructure/states/movies.state';

export const provideMovieFeature = () => [
  { provide: MOVIES_REPOSITORY, useClass: HttpMoviesService }, // multi: false},
  { provide: DISPLAY_MODE_REPOSITORY, useClass: HttpModeService }, // multi: false},
  { provide: CINEMA_LOCATION_REPOSITORY, useClass: HttpCinemaLocationService },
  MoviesState,
];
