import { Injectable } from "@angular/core";
import { AvailableDaysQueryParams, MovieRepository } from "../repositories/movie.repository";

@Injectable({
  providedIn: "root",
})
export class GetAvailableDaysUseCase {
  constructor(private movieRepository: MovieRepository) {}
  execute(endUrl: string, queryParams: AvailableDaysQueryParams): Promise<string[]> {
    return this.movieRepository.getAvailableDays(endUrl, queryParams);
  }
}
