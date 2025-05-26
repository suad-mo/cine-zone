import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModeSelectComponent } from './components/display-mode-select/display-mode-select.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MoviesState } from '../../infrastructure/states/movies.state';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message.component';
import { LocationSelectComponent } from './components/location-select.component';
import { DaySelectComponent } from './components/day-select/day-select.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

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
})
export class MoviesPageComponent implements OnInit {
  isLoaded = signal<boolean>(false);
  state = inject(MoviesState);
  category = this.state.selectedIdMode;
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    const initialParams = this.route.snapshot.queryParams;
    await this.state.applyExternalParams(initialParams);
    this.isLoaded.set(true);
  }

  getEmptyMessage(): string {
    if (this.state.errors.movies()) return '';
    if (!this.state.selectedMode()) return 'Select a mode';
    if (!this.state.selectedLocation()) return 'Select a location';
    if (!this.state.selectedDate()) return 'Select a date';
    return 'No movies found for selected criteria';
  }
}
