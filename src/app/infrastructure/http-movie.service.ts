import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import {
  AvailableDaysQueryParams,
  MovieQueryParams,
  MovieRepository,
} from '../core/repositories/movie.repository';
import { Movie } from '../core/entities/movie.entity';

@Injectable({ providedIn: 'root' })
export class HttpMovieService implements MovieRepository {
  private readonly apiUrlV2 = 'https://app.cineplexx.ba/api/v2/';
  private urlListDays = `${this.apiUrlV2}movies/filters`; //dates/list`;
  private urlMovies = `${this.apiUrlV2}movies`; //?date=${date}&location=${location}`;

  constructor(private http: HttpClient) {}

  getAvailableDays(
    endUrl: string,
    queryParams: AvailableDaysQueryParams
  ): Promise<string[]> {
    const url = `${this.urlListDays}/${endUrl}`;
    let params: Record<string, any> = {};
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key as keyof AvailableDaysQueryParams] !== undefined) {
        params[key] = queryParams[key as keyof AvailableDaysQueryParams];
      }
    });
    console.log('params', params['location']);
    console.log('type', typeof params['comingSoon']);
    const isEgal = params['location'] === '-1';
    console.log('isEgal', isEgal);
    if (params['location'] === '-1') {
      params = {
        ...params,
        location: 'all',
      };
    }
    return lastValueFrom(
      this.http
        .get<string[]>(url, {
          params: { ...params },
        })
        .pipe(
          map((resStr: string[]) => resStr.map((date) => date.split('T')[0])) // Format YYYY-MM-DD
          //   {
          //   //provjeriti da je resStr datum
          //   return resStr.map((date) => {
          //     const dateObj = new Date(date);
          //     return dateObj.toISOString().split('T')[0]; // Format YYYY-MM-DD
          //   });
          // }
        )
    );
  }

  getMovies(endUrl: string, queryParams: MovieQueryParams): Promise<Movie[]> {
    const url =
      endUrl.length > 0 ? `${this.urlMovies}/${endUrl}` : this.urlMovies;
    if (queryParams.location === '-1') {
      queryParams['location'] = 'all';
    }
    return lastValueFrom(
      this.http.get<Movie[]>(url, { params: { ...queryParams } })
    );
  }
}
