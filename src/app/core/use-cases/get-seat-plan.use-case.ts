import { Inject, Injectable } from '@angular/core';
import {
  MOVIES_REPOSITORY,
  MovieRepository,
} from '../repositories/movie.repository';
import { Params } from '@angular/router';
import { DateSessions } from '../entities/session.entity';
import { Area } from '../entities/area.entity';
import { SeatPlan } from '../entities/seat-plan.entity';

@Injectable({
  providedIn: 'root',
})
export class GetSeatPlanUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY) private movieRepository: MovieRepository
  ) {}
  execute(cinemaId: string, sessionId: string): Promise<SeatPlan> {
    return this.movieRepository.getSeatPlan(cinemaId, sessionId);
  }
}
