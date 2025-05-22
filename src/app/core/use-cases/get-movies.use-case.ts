import { Injectable } from '@angular/core';
import {
  MovieQueryParams,
  MovieRepository,
} from '../repositories/movie.repository';
import { Movie } from '../entities/movie.entity';

@Injectable({
  providedIn: 'root',
})
export class GetMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}
  execute(endUrl: string, queryParams: MovieQueryParams): Promise<Movie[]> {
    return this.movieRepository.getMovies(endUrl, queryParams);
  }
}
