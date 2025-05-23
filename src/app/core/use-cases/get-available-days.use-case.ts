import { Inject, Injectable } from '@angular/core';
import {
  AvailableDaysQueryParams,
  MOVIE_REPOSITORY,
  MovieRepository,
} from '../repositories/movie.repository';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GetAvailableDaysUseCase {
  constructor(
    @Inject(MOVIE_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(
    endUrl: string,
    params: Params
  ): Promise<string[]> {
    return this.movieRepository.getAvailableDays(endUrl, params);
  }
}
