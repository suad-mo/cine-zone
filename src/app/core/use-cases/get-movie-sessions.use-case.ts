import { Inject, Injectable } from '@angular/core';
import {
  MOVIES_REPOSITORY,
  MovieRepository,
} from '../repositories/movie.repository';
import { Params } from '@angular/router';
import { MovieSessions } from '../entities/session.entity';

@Injectable({
  providedIn: 'root',
})
export class GetMovieSessionsUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(id: string, params: Params): Promise<MovieSessions> {
    return this.movieRepository.getMovieSessions(id, params);
  }
}
