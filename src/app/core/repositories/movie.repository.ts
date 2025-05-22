import { AppConfig } from "../entities/config.entity";
import { Movie } from "../entities/movie.entity";

export abstract class  MovieRepository {
  abstract getAvailableDays(endUrl: string, queryParams: AvailableDaysQueryParams): Promise<string[]>;
  abstract getMovies(endUrl: string, queryParams: MovieQueryParams): Promise<Movie[]>;
}

export interface MovieQueryParams {
  // category: string;
  location: string;
  date: string;
}
export interface AvailableDaysQueryParams {
  top: boolean | undefined;
  location: string | undefined;
  comingSoon: boolean | undefined;
}
