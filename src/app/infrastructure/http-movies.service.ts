import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import {
  MovieRepository,
} from '../core/repositories/movie.repository';
import { Movie } from '../core/entities/movie.entity';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpMoviesService implements MovieRepository {
  private readonly apiUrlV2 = 'https://app.cineplexx.ba/api/v2/';
  private readonly apiUrlV1 = 'https://app.cineplexx.ba/api/v1/'; //?date=2023-10-01&location=BA
  private urlListDays = `${this.apiUrlV2}movies/filters`; //dates/list`;
  private urlMovies = `${this.apiUrlV2}movies`; //?date=${date}&location=${location}`;

  constructor(private http: HttpClient) {}

  getAvailableDays(endUrl: string, params: Params): Promise<string[]> {
    const url =
      endUrl.length > 0 ? `${this.urlListDays}/${endUrl}` : this.urlListDays;

    return lastValueFrom(
      this.http
        .get<string[]>(url, {
          params,
        })
        .pipe(
          map((resStr: string[]) => {
            const res = resStr.map((date) => date.split('T')[0]);
            return res;
          })
        )
    );
  }

  getMovies(endUrl: string, params: Params): Promise<Movie[]> {
    const url =
      endUrl.length > 0 ? `${this.urlMovies}/${endUrl}` : this.urlMovies;

    return lastValueFrom(this.http.get<Movie[]>(url, { params }));
  }

  getMovieDetails(id: string): Promise<Movie> {
    const url = `${this.apiUrlV1}/movies/${id}`;
    return lastValueFrom(this.http.get<Movie>(url));
  }
}
