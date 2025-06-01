// core/repositories/movie.repository.ts
import { InjectionToken } from '@angular/core';
import { Movie } from '../entities/movie.entity';
import { DateSessions } from '../entities/session.entity';
import { Params } from '@angular/router';
import { ScheduledMovieSession } from '../entities/sheduled-movie-session';
import { Area } from '../entities/area.entity';
import { SeatPlan } from '../entities/seat-plan.entity';

export abstract class MovieRepository {
  abstract getAvailableDays(endUrl: string, params: Params): Promise<string[]>;
  abstract getDates(url: string, params: Params): Promise<string[]>;
  abstract getMovies(endUrl: string, params: Params): Promise<Movie[]>;
  abstract getMovieDetails(id: string): Promise<Movie>;
  abstract getMovieSessions(
    id: string,
    params: Params
  ): Promise<DateSessions[]>;
  abstract getSheduledMovieSession(id: string): Promise<ScheduledMovieSession>;
  abstract getArea(cinemaId: string, sessionId: string): Promise<Area[]>;
  abstract getSeatPlan(cinemaId: string, sessionId: string): Promise<SeatPlan[]>;
}

export const MOVIES_REPOSITORY = new InjectionToken<MovieRepository>(
  'MovieRepository'
);
