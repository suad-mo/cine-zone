// core/repositories/movie.repository.ts
import { InjectionToken } from '@angular/core';
import { Movie } from '../entities/movie.entity';
import { Params } from '@angular/router';

export interface MovieQueryParams {
  location: string;
  date: string;
}

export interface AvailableDaysQueryParams {
  top?: boolean;
  location?: string;
  comingSoon?: boolean;
}

export abstract class MovieRepository {
  abstract getAvailableDays(endUrl: string, params: Params): Promise<string[]>;
  abstract getMovies(endUrl: string, params: Params): Promise<Movie[]>;
}

export const MOVIE_REPOSITORY = new InjectionToken<MovieRepository>('MovieRepository');
