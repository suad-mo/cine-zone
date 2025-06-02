import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, tap } from 'rxjs';
import { MovieRepository } from '../core/repositories/movie.repository';
import { Movie } from '../core/entities/movie.entity';
import { Params } from '@angular/router';
import { DateSessions } from '../core/entities/session.entity';
import { ScheduledMovieSession } from '../core/entities/sheduled-movie-session';
import { Area } from '../core/entities/area.entity';
import { SeatPlan } from '../core/entities/seat-plan.entity';

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

  getDates(url: string, params: Params): Promise<string[]> {
    return lastValueFrom(
      this.http
        .get<string[]>(url, { params })
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
    const url = `${this.apiUrlV1}movies/${id}`;
    return lastValueFrom(this.http.get<Movie>(url));
  }

  getMovieSessions(id: string, params: Params): Promise<DateSessions[]> {
    const url = `${this.apiUrlV2}movies/${id}/sessions`;
    return lastValueFrom(
      this.http.get<DateSessions[]>(url, { params })
      .pipe(
        tap((res) => {
          // Transform the response if needed
          console.log('Movie Sessions:', res);
        }),
      )
    );
  }

  getSheduledMovieSession(id: string): Promise<ScheduledMovieSession> {
    const url = `${this.apiUrlV1}sessions/${id}`;
    return lastValueFrom(
      this.http.get<ScheduledMovieSession>(url)
    ).then((response) => {
      // Transform the response if needed
      // console.log('Scheduled Film Session:', response);
      return response;
    })
  }

  getArea(cinemaId: string, sessionId: string): Promise<Area[]> {
    const url = `${this.apiUrlV1}cinemas/${cinemaId}/sessions/${sessionId}/area-categories`;
    // https://app.cineplexx.ba/api/v1/cinemas/1182/sessions/46011/area-categories
    return lastValueFrom(
      this.http.get<Area[]>(url).pipe(
        map((areas) => {
          // Transform the response if needed
          console.log('Areas:', areas);
          return areas;
        })
      )
    );
  }
  getSeatPlan(cinemaId: string, sessionId: string): Promise<SeatPlan> {
    // https://app.cineplexx.ba/api/v1/seat-plan/1182/46011
    const url = `${this.apiUrlV1}seat-plan/${cinemaId}/${sessionId}`;
    return lastValueFrom(
      this.http.get<SeatPlan>(url).pipe(
        map((seatPlans) => {
          // Transform the response if needed
          console.log('Seat Plans:', seatPlans);
          return seatPlans;
        })
      )
    );
  }
}
