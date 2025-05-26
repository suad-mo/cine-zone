// core/repositories/movie.repository.ts
import { InjectionToken } from '@angular/core';
import { Movie } from '../entities/movie.entity';
import { Params } from '@angular/router';



export abstract class MovieRepository {
  abstract getAvailableDays(endUrl: string, params: Params): Promise<string[]>;
  abstract getMovies(endUrl: string, params: Params): Promise<Movie[]>;
  abstract getMovieDetails(id: string): Promise<Movie>;
}

export const MOVIES_REPOSITORY = new InjectionToken<MovieRepository>('MovieRepository');
