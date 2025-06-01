import { Inject, Injectable } from '@angular/core';
import {
  MOVIES_REPOSITORY,
  MovieRepository,
} from '../repositories/movie.repository';
import { Params } from '@angular/router';
import { DateSessions } from '../entities/session.entity';
import { Area } from '../entities/area.entity';

@Injectable({
  providedIn: 'root',
})
export class GetAreaUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(cinemaId: string, sessionId: string): Promise<Area[]> {
    return this.movieRepository.getArea(cinemaId, sessionId);
  }
}
