import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { MOVIES_REPOSITORY, MovieRepository } from '../repositories/movie.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAvailableDaysUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(
    endUrl: string,
    params: Params
  ): Promise<string[]> {
    return this.movieRepository.getAvailableDays(endUrl, params);
  }
}
