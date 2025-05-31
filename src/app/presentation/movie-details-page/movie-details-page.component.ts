import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsState } from '../../infrastructure/states/movie-details.state';
import { CommonModule } from '@angular/common';
import { LocationsState } from '../../infrastructure/states/locations.state';
import { DateSelectComponent } from '../components/date-select/date-select.component';
import { LocationSelectComponent } from '../components/location-select/location-select.component';

@Component({
  selector: 'app-movie-details-page',
  imports: [CommonModule, DateSelectComponent, LocationSelectComponent],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  providers: [MovieDetailsState],
})
export class MovieDetailsPageComponent {
  private movieDetailsState = inject(MovieDetailsState);
  // private locationState = inject(LocationsState);
  private route = inject(ActivatedRoute);
  // Signals
  movie = this.movieDetailsState.movieDetails;
  loading = this.movieDetailsState.loading;
  error = this.movieDetailsState.error;
  dates = this.movieDetailsState.dates;
  selectDate = this.movieDetailsState.date;

  // locations = this.locationState.locations;
  selectedIdLocation = this.movieDetailsState.selectedIdLocation;


  loadingDates = this.movieDetailsState.loadingDates;
  errorDates = this.movieDetailsState.errorDates;
  movieSessions = this.movieDetailsState.movieSessions;
  loadingSessions = this.movieDetailsState.loadingSessions;
  errorSessions = this.movieDetailsState.errorSessions;
  // Constructor
  constructor() {
    const queryParams = this.route.snapshot.queryParams;
    const paramMap = this.route.snapshot.paramMap;
    // console.log('Query Params:', queryParams);

    this.movieDetailsState.setLocationId(queryParams['location'] || null);
    this.movieDetailsState.setDate(queryParams['date'] || null);
    this.movieDetailsState.movieId = paramMap.get('id') || null;
  }

  setDate(date: string | null) {
    this.movieDetailsState.setDate(date);
  }
  setLocation(locationId: string | null) {
    this.movieDetailsState.setLocationId(locationId);
    console.log('Selected Location ID:', locationId);

  }
}
