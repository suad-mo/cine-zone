import { Injectable, effect, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAvailableDaysUseCase } from '../../core/use-cases/get-available-days.use-case';
import { GetMoviesUseCase } from '../../core/use-cases/get-movies.use-case';
import { Movie } from '../../core/entities/movie.entity';
import { DisplayMode } from '../../core/entities/display-mode.entity';
import { CinemaLocation } from '../../core/entities/cinema-location.entity';
import { GetModesUseCase } from '../../core/use-cases/get-display-modes.use-case';
import { GetLocationsUseCase } from '../../core/use-cases/get-cinema-locations.use-case';
import { AvailableDaysQueryParams, MovieQueryParams } from '../../core/repositories/movie.repository';

@Injectable({ providedIn: 'root' })
export class MovieState {
  // Stanje podataka
  private _modes = signal<DisplayMode[]>([]);
  private _locations = signal<CinemaLocation[]>([]);
  private _days = signal<string[]>([]);
  private _movies = signal<Movie[]>([]);

  // Selektovane vrijednosti
  selectedMode = signal<DisplayMode | null>(null);
  selectedLocation = signal<CinemaLocation | null>(null);
  selectedDay = signal<string | null>(null);

  // Loading stanja
  private modesLoading = signal(false);
  private locationsLoading = signal(false);
  private daysLoading = signal(false);
  private moviesLoading = signal(false);

  // Error stanja
  private modesError = signal<Error | null>(null);
  private locationsError = signal<Error | null>(null);
  private daysError = signal<Error | null>(null);
  private moviesError = signal<Error | null>(null);

  // Readonly izloženo stanje
  readonly modes = this._modes.asReadonly();
  readonly locations = this._locations.asReadonly();
  readonly days = this._days.asReadonly();
  readonly movies = this._movies.asReadonly();

  readonly loadingStates = {
    modes: this.modesLoading.asReadonly(),
    locations: this.locationsLoading.asReadonly(),
    days: this.daysLoading.asReadonly(),
    movies: this.moviesLoading.asReadonly(),
  };

  readonly errors = {
    modes: this.modesError.asReadonly(),
    locations: this.locationsError.asReadonly(),
    days: this.daysError.asReadonly(),
    movies: this.moviesError.asReadonly(),
  };

  constructor(
    private getModes: GetModesUseCase,
    private getLocations: GetLocationsUseCase,
    private getDays: GetAvailableDaysUseCase,
    private getMovies: GetMoviesUseCase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeData();
    this.setupReactiveUpdates();
    this.setupUrlSync();
  }

  private async initializeData() {
    try {
      this.modesLoading.set(true);
      this.locationsLoading.set(true);

      const [modes, locations] = await Promise.all([
        this.getModes.execute(),
        this.getLocations.execute(),
      ]);

      this._modes.set(modes);
      this._locations.set(locations);

      // Postavi početne vrijednosti
      this.selectedMode.set(modes[0] || null);
      this.selectedLocation.set(locations[0] || null);

      // Sync sa URL parametrima
      this.readInitialParams();
    } catch (error) {
      console.log('Error fetching initial data:', error);

      this.modesError.set(error as Error);
      this.locationsError.set(error as Error);
    } finally {
      this.modesLoading.set(false);
      this.locationsLoading.set(false);
    }
  }

  private setupReactiveUpdates() {
    // Automatsko dobavljanje dana
    effect(async () => {
      const mode = this.selectedMode();
      const location = this.selectedLocation();

      if (mode && location) {
        try {
          this.daysLoading.set(true);
          this.daysError.set(null);
          const queryParams: AvailableDaysQueryParams = {
            top: mode.id === 'top' ? true : undefined,
            location: mode.id !== 'upcoming' ? location.id.toString() : undefined,
            comingSoon: mode.id === 'upcoming' ? true : undefined,
          };
          const endUrl = mode.queryParm;
          const days = await this.getDays.execute(endUrl,queryParams);
          this._days.set(days);

          // Automatski selektuj prvi dan ako nije selektovan
          // ili se ne nalazi u listi
          if (!this.selectedDay() && days.length > 0) {
            this.selectedDay.set(days[0]);
          }
          if (
            this.selectedDay() &&
            !days.some((d) => d.split('T')[0] === this.selectedDay()) && days.length > 0
          ) {
            this.selectedDay.set(days[0]);
          }
        } catch (error) {
          console.log('Error fetching initial data:', error);
          this.daysError.set(error as Error);
          this._days.set([]);
        } finally {
          this.daysLoading.set(false);
        }
      }
    });

    // Automatsko dobavljanje filmova
    effect(async () => {
      const mode = this.selectedMode();
      const location = this.selectedLocation();
      const day = this.selectedDay();
      console.log('Selected day:', day);


      if (mode && location && day) {
        try {
          this.moviesLoading.set(true);
          this.moviesError.set(null);
          const endUrl = mode.endUrl;
          console.log('End URL:', endUrl);

          const queryParam: MovieQueryParams = {
            date: day,
            location: location.id.toString(),
            // category: mode.id,
          };
          const movies = await this.getMovies.execute(endUrl, queryParam);
          this._movies.set(movies);
        } catch (error) {
          console.log('Error fetching initial data:', error);
          this.moviesError.set(error as Error);
          this._movies.set([]);
        } finally {
          this.moviesLoading.set(false);
        }
      }
    });
  }

  private setupUrlSync() {
    // Ažuriranje URL-a na promjenu selektcija
    effect(() => {
      let params = <{category: string, location?: string, date: string}>{
        category: this.selectedMode()?.id,
        location: this.selectedLocation()?.id.toString(),
        date: this.selectedDay()?.split('T')[0],
      };
      console.log('isss', params.category === 'upcoming');

      if (params.location === '-1') {
        params.location = 'all';
      }

      if (params.category === 'upcoming') {
        params = {
          date: params.date,
          category: params.category,
        }
      }

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: params,
        // queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });

    // Praćenje promjena URL parametara
    this.route.queryParams.subscribe((params) => this.applyUrlParams(params));
  }

  private readInitialParams() {
    const params = this.route.snapshot.queryParams;
    this.applyUrlParams(params);
  }

  private applyUrlParams(params: any) {
    // Ažuriraj mode samo ako postoji u dostupnim modovima
    if (params['mode']) {
      const mode = this._modes().find((m) => m.id === params['mode']);
      if (mode) this.selectedMode.set(mode);
    }

    // Ažuriraj lokaciju samo ako postoji u dostupnim lokacijama
    if (params['location']) {
      const location = this._locations().find(
        (l) => l.id === params['location']
      );
      if (location) this.selectedLocation.set(location);
    }

    // Ažuriraj datum samo ako je validan i postoji u dostupnim danima
    if (params['day']) {
      const day = new Date(params['day']);
      if (!isNaN(day.getTime())) {
        const isValidDay = this._days().some(
          (d) =>
            d.split('T')[0] === day.toISOString().split('T')[0]
        );
        if (isValidDay) this.selectedDay.set(day.toISOString().split('T')[0]);
      }
    }
  }

  // Javne metode za ručno osvježavanje podataka
  async refreshModes() {
    try {
      this.modesLoading.set(true);
      const modes = await this.getModes.execute();
      this._modes.set(modes);
    } catch (error) {
      console.log('Error fetching initial data:', error);
      this.modesError.set(error as Error);
    } finally {
      this.modesLoading.set(false);
    }
  }

  async refreshLocations() {
    try {
      this.locationsLoading.set(true);
      const locations = await this.getLocations.execute();
      this._locations.set(locations);
    } catch (error) {
      this.locationsError.set(error as Error);
    } finally {
      this.locationsLoading.set(false);
    }
  }
}
