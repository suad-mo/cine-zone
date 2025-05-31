import { effect, Injectable, signal } from '@angular/core';
import { Movie } from '../../core/entities/movie.entity';
import { GetMovieDetailsUseCase } from '../../core/use-cases/get-movie-details.use-case';
import { MovieSessions } from '../../core/entities/session.entity';
import { GetDatesUseCase } from '../../core/use-cases/get-dates.use-case';
import { GetMovieSessionsUseCase } from '../../core/use-cases/get-movie-sessions.use-case';
import { Params } from '@angular/router';

// https://app.cineplexx.ba/api/v2/movies/filters/dates/list?id=HO00016009&location=0
@Injectable({
  providedIn: 'root',
})
export class MovieDetailsState {
  private _movieId = signal<string | null>(null);
  set movieId(id: string | null) {
    this._movieId.set(id);
  }
  get movieId(): string | null {
    return this._movieId();
  }

  private _locationId = signal<string | null>(null);
  selectedIdLocation = this._locationId.asReadonly();

  setLocationId(id: string | null) {
    this._locationId.set(id);
    console.log('Location ID set to:', id, this.selectedIdLocation());
  }

  private _date = signal<string | null>(null);
  readonly date = this._date.asReadonly();

  setDate(date: string | null) {
    this._date.set(date);
  }

  private _movieDetails = signal<Movie | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<Error | null>(null);

  private _dates = signal<string[]>([]);
  private _loadingDates = signal<boolean>(false);
  private _errorDates = signal<Error | null>(null);

  private _movieSessons = signal<MovieSessions | null>(null);
  private _loadingSessions = signal<boolean>(false);
  private _errorSessions = signal<Error | null>(null);

  readonly movieDetails = this._movieDetails.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly dates = this._dates.asReadonly();
  readonly loadingDates = this._loadingDates.asReadonly();
  readonly errorDates = this._errorDates.asReadonly();

  readonly movieSessions = this._movieSessons.asReadonly();
  readonly loadingSessions = this._loadingSessions.asReadonly();
  readonly errorSessions = this._errorSessions.asReadonly();

  constructor(
    private getMovieDetailsUseCase: GetMovieDetailsUseCase,
    private getDatesUseCase: GetDatesUseCase,
    private getMovieSesionsUseCase: GetMovieSessionsUseCase // Assuming you have a use case for getting dates
  ) {
    effect(() => {
      console.log('Movie ID changed:', this._movieId());
      const movieId = this._movieId();
      if (movieId) {
        this._loadMovieDetails(movieId);
      }
    });

    effect(() => {
      const location = this._locationId();
      if (!location) return;
      // const id = this._movieId();
      // if (!id) return;
      console.log('Movie ID and Location changed:', location);
      // if (id && location) {
      if (location) {
        this._loadDates();
        // this._loadMovieSessions();
      }
    });


    effect(() => {
      console.log('Selected date changed:', this._date());

      const date = this._date();
      if (!this._movieId()) return;
      if (date) {
        this._loadMovieSessions();
      }
    });
  }

  private async _loadMovieDetails(id: string): Promise<void> {
    try {
      this._loading.set(true);
      const movie = await this.getMovieDetailsUseCase.execute(id);
      this._movieDetails.set(movie);
    } catch (error) {
      this._error.set(error as Error);
      console.error('Error loading movie details:', error);
    } finally {
      this._loading.set(false);
    }
  }

  private async _loadDates(): Promise<void> {
    try {
      this._loadingDates.set(true);
      const url = 'https://app.cineplexx.ba/api/v2/movies/filters/dates/list';
      const params = {
        id: this._movieId(),
        location: this._locationId(),
      };
      const dates = await this.getDatesUseCase.execute(url, params);
      this._dates.set(dates);
      // this._date() &&
      if ( dates.includes(this._date() || '')) {
        console.log('Current date is already in the list:', this._date());
        return; // If the current date is already in the list, do not change it
      }
      if (dates.length > 0) {
      }
    } catch (error) {
      this._errorDates.set(error as Error);
      console.error('Error loading dates:', error);
    } finally {
      this._loadingDates.set(false);
    }
  }

  private async _loadMovieSessions(): Promise<void> {
    try {
      this._loadingSessions.set(true);
      const id = this._movieId();
      if (!id) return;
      const url = `https://app.cineplexx.ba/api/v2/movies/${id}/sessions`;
      const params: Params = {
        location: this._locationId() || 'all',
        date: this._date() || '',
      };
      const sessions = await this.getMovieSesionsUseCase.execute(id, params);
      this._movieSessons.set(sessions);
    } catch (error) {
      this._errorSessions.set(error as Error);
      console.error('Error loading movie sessions:', error);
    } finally {
      this._loadingSessions.set(false);
    }
  }
}
