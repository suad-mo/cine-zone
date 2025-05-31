import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModeSelectComponent } from './components/display-mode-select/display-mode-select.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MoviesState } from '../../infrastructure/states/movies.state';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message.component';
import { DaySelectComponent } from './components/day-select/day-select.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
// import { LocationSelectComponent } from './components/location-select.component';
import { LocationSelectComponent } from '../components/location-select/location-select.component';

@Component({
  standalone: true,
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  imports: [
    CommonModule,
    TabsModule,
    LocationSelectComponent,
    DaySelectComponent,
    MovieGridComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  providers: [MoviesState],
})
export class MoviesPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  state = inject(MoviesState);
  isLoaded = signal<boolean>(false);
  category = this.state.selectedIdMode;

  selectedIdLocation = this.state.selectedIdLocation;

  async ngOnInit() {
    const initialParams = this.route.snapshot.queryParams;
    await this.state.applyExternalParams(initialParams);
    this.isLoaded.set(true);
  }

  setLocation(locationId: string | null) {
    this.state.setLocationId(locationId);
    console.log('Selected Location ID:', locationId);

  }

  getEmptyMessage(): string {
    if (this.state.errors.movies()) return '';
    if (!this.state.selectedMode()) return 'Select a mode';
    if (!this.state.selectedIdLocation()) return 'Select a location';
    if (!this.state.selectedDate()) return 'Select a date';
    return 'No movies found for selected criteria';
  }
}
