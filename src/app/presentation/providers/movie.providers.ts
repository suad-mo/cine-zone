import { CinemaLocationRepository } from '../../core/repositories/cinema-location.repository';
import { DisplayModeRepository } from '../../core/repositories/display-mode.repository';
import { MovieRepository } from '../../core/repositories/movie.repository';
import { HttpCinemaLocationService } from '../../infrastructure/http-cinema-location.service';
import { HttpModeService } from '../../infrastructure/http-display-mode.service';
import { HttpMovieService } from '../../infrastructure/http-movie.service';
import { MovieState } from '../../infrastructure/state/movie.state';

export const provideMovieFeature = () => [
  { provide: MovieRepository, useClass: HttpMovieService }, // multi: false},
  { provide: DisplayModeRepository, useClass: HttpModeService }, // multi: false},
  { provide: CinemaLocationRepository, useClass: HttpCinemaLocationService },
  MovieState,
];
