import { Inject, Injectable } from '@angular/core';
import {
  MOVIES_REPOSITORY,
  MovieRepository,
} from '../repositories/movie.repository';
import { Params } from '@angular/router';
import { DateSessions } from '../entities/session.entity';
import { ScheduledMovieSession } from '../entities/sheduled-movie-session';

@Injectable({
  providedIn: 'root',
})
export class GetSheduledMovieSessionsUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(id: string ): Promise<ScheduledMovieSession> {
    return this.movieRepository.getSheduledMovieSession(id);
  }
}
