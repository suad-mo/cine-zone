import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModeSelectComponent } from './components/display-mode-select/display-mode-select.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MovieState } from '../../infrastructure/state/movie.state';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message.component';
import { LocationSelectComponent } from './components/location-select.component';
import { DaySelectComponent } from './components/day-select/day-select.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  // template: `
  //   <div class="page-container">
  //     <!-- Global Loading Indicator -->
  //     @if (state.loadingStates.modes() || state.loadingStates.locations()) {
  //       <div class="global-loading">
  //         <app-loading-spinner size="large" />
  //       </div>
  //     }

  //     <!-- Error Messages -->
  //     @if (state.errors.modes()) {
  //       <app-error-message [error]="state.errors.modes()" />
  //     }
  //     @if (state.errors.locations()) {
  //       <app-error-message [error]="state.errors.locations()" />
  //     }

  //     <!-- Filters Section -->
  //     <div class="filters-container">
  //       <div class="filter-group">
  //         <app-mode-select
  //           [modes]="state.modes()"
  //           [selectedId]="state.selectedMode()?.id ?? null"
  //           [disabled]="!!state.errors.modes()"
  //           (selectedChange)="state.selectedMode.set($event)"
  //         />

  //         @if (state.errors.modes()) {
  //           <button class="refresh-button" (click)="state.refreshModes()">
  //             Retry
  //           </button>
  //         }
  //       </div>

  //       <div class="filter-group">
  //         <app-location-select
  //           [locations]="state.locations()"
  //           [selectedId]="state.selectedLocation() && state.selectedLocation()?.id != null ? state.selectedLocation()!.id.toString() : null"
  //           [disabled]="!!state.errors.locations()"
  //           (selectedChange)="state.selectedLocation.set($event)"
  //         />

  //         @if (state.errors.locations()) {
  //           <button class="refresh-button" (click)="state.refreshLocations()">
  //             Retry
  //           </button>
  //         }
  //       </div>

  //       <div class="filter-group">
  //         <app-day-select
  //           [days]="state.days()"
  //           [selectedDate]="state.selectedDay()"
  //           [disabled]="!!state.errors.days() || state.loadingStates.days()"
  //           (selectedChange)="state.selectedDay.set($event)"
  //         />

  //         @if (state.loadingStates.days()) {
  //           <app-loading-spinner size="small" />
  //         }
  //         @if (state.errors.days()) {
  //           <span class="error-text">Failed to load days</span>
  //         }
  //       </div>
  //     </div>

  //     <!-- Movies Grid -->
  //     <div class="content-container">
  //       @if (state.loadingStates.movies()) {
  //         <div class="movies-loading">
  //           <app-loading-spinner size="medium" />
  //         </div>
  //       }

  //       @if (state.errors.movies()) {
  //         <app-error-message [error]="state.errors.movies()" />
  //       }

  //       <app-movie-grid
  //         [movies]="state.movies()"
  //         [emptyMessage]="getEmptyMessage()"
  //       />
  //     </div>
  //   </div>
  // `,
  // styles: [
  //   `
  //     .page-container {
  //       padding: 2rem;
  //       max-width: 1200px;
  //       margin: 0 auto;
  //     }

  //     .global-loading {
  //       display: flex;
  //       justify-content: center;
  //       padding: 4rem;
  //     }

  //     .filters-container {
  //       display: grid;
  //       grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  //       gap: 1.5rem;
  //       margin-bottom: 2rem;
  //     }

  //     .filter-group {
  //       display: flex;
  //       gap: 0.5rem;
  //       align-items: center;
  //     }

  //     .refresh-button {
  //       padding: 0.25rem 0.5rem;
  //       background: #f0f0f0;
  //       border: 1px solid #ccc;
  //       border-radius: 4px;
  //       cursor: pointer;
  //     }

  //     .error-text {
  //       color: #d32f2f;
  //       font-size: 0.875rem;
  //     }

  //     .content-container {
  //       position: relative;
  //       min-height: 400px;
  //     }

  //     .movies-loading {
  //       position: absolute;
  //       top: 50%;
  //       left: 50%;
  //       transform: translate(-50%, -50%);
  //     }
  //   `
  // ],
  imports: [
    CommonModule,
    // DatePipe,
    ModeSelectComponent,
    LocationSelectComponent,
    DaySelectComponent,
    MovieGridComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ]
})
export class MoviePageComponent implements OnInit {
  protected state = inject(MovieState);
  private route = inject(ActivatedRoute);
  // private router = inject(Router);

 async ngOnInit() {
    await this.state.loadInitialData();
    const initialParams = this.route.snapshot.queryParams;
    this.state.applyExternalParams(initialParams);

    // this.route.queryParams.subscribe((params) => {
    //   this.state.applyExternalParams(params);
    // });
  }

  getEmptyMessage(): string {
    if (this.state.errors.movies()) return '';
    if (!this.state.selectedMode()) return 'Select a mode';
    if (!this.state.selectedLocation()) return 'Select a location';
    if (!this.state.selectedDay()) return 'Select a day';
    return 'No movies found for selected criteria';
  }
}
