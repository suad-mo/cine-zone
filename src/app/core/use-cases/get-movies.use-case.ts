import { Inject, Injectable } from '@angular/core';
import {
  MOVIES_REPOSITORY,
  MovieRepository,
} from '../repositories/movie.repository';
import { Movie } from '../entities/movie.entity';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GetMoviesUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(endUrl: string, queryParams: Params): Promise<Movie[]> {
    return this.movieRepository.getMovies(endUrl, queryParams);
  }
}
