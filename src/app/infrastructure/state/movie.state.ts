import { Injectable, computed, effect, signal } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetAvailableDaysUseCase } from '../../core/use-cases/get-available-days.use-case';
import { GetMoviesUseCase } from '../../core/use-cases/get-movies.use-case';
import { Movie } from '../../core/entities/movie.entity';
import { DisplayMode } from '../../core/entities/display-mode.entity';
import { CinemaLocation } from '../../core/entities/cinema-location.entity';
import { GetModesUseCase } from '../../core/use-cases/get-display-modes.use-case';
import { GetLocationsUseCase } from '../../core/use-cases/get-cinema-locations.use-case';
import {
  AvailableDaysQueryParams,
  MovieQueryParams,
} from '../../core/repositories/movie.repository';

@Injectable({ providedIn: 'root' })
export class MovieState {
  // Stanje podataka
  private _modes = signal<DisplayMode[]>([]);
  private _locations = signal<CinemaLocation[]>([]);
  private _days = signal<string[]>([]);
  private _movies = signal<Movie[]>([]);

  private _isInitialized = false;

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

  // Ovoaj interfejs postavlja početne vrijednosti na null
  private previousParam = {
    mode: null as DisplayMode | null,
    location: null as CinemaLocation | null,
    day: null as string | null,
  };

  readonly changeDetector = computed(() => ({
    mode: this.selectedMode(),
    location: this.selectedLocation(),
    date: this.selectedDay(),
  }));

  readonly changeParams = computed(() => {
    const mode = this.selectedMode();
    const location = this.selectedLocation();
    const date = this.selectedDay();
    let params: Params = {};
    if (mode) {
      params = {
        ...params,
        category: mode.id,
      };
      if (mode.id !== 'upcoming' && location) {
        params = {
          ...params,
          location: location.id === -1 ? 'all' : location.id.toString(),
        };
      }
      if (date) {
        params = {
          ...params,
          date: date.split('T')[0],
        };
      }
    }
    return params;
  });

  readonly dateQueryParamsAndEndUrl = computed(() => {
    const mode = this.selectedMode();
    const location = this.selectedLocation();
    // const date = this.selectedDay();
    const loc = location ? (location!.id === -1 ? 'all' : location!.id) : 'all';
    const queryParams: Params = {};
    if (mode !== null && mode!.id === 'top') {
      queryParams['top'] = true;
    }
    if (mode !== null && mode!.id === 'upcoming') {
      queryParams['comingSoon'] = true;
    } else {
      queryParams['location'] = loc;
    }
    const endUrl = mode !== null ? mode!.queryParm : '';
    return { endUrl, queryParams };
  });

  readonly moviesQueryParamsAndEndUrl = computed(() => {
    const mode = this.selectedMode();
    const location = this.selectedLocation();
    const date = this.selectedDay();
    const loc = location!.id !== -1 ? location!.id.toString() : 'all';
    const endUrl = mode ? mode.endUrl : '';

    const queryParams: Params = {
      // date: date ? date : 'all',
      location: loc,
    };
    if (date !== 'all') {
      queryParams['date'] = date;
    }

    return { endUrl, queryParams };
  });

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
    this.setupReactiveUpdates();
    this._setupUrlSync();
  }

  async initialize(externalParams: Params) {
    await this.loadInitialData();
    this.applyExternalParams(externalParams);
  }
  async loadInitialData() {
    try {
      this.modesLoading.set(true);
      this.locationsLoading.set(true);

      const [modes, locations] = await Promise.all([
        this.getModes.execute(),
        this.getLocations.execute(),
      ]);

      this._modes.set(modes);
      this._locations.set(locations);
    } catch (error) {
      this.modesError.set(error as Error);
      this.locationsError.set(error as Error);
    } finally {
      this.modesLoading.set(false);
      this.locationsLoading.set(false);
    }
  }

  applyExternalParams(params: Params) {
    // Logika za primjenu parametara
    this._applyCategoryParam(params['category']);
    this._applyLocationParam(params['location']);
    this._applyDateParam(params['date']);
  }

  private _applyCategoryParam(category?: string) {
    const celecteMode = this.selectedMode();
    if (category && this._modes().length > 0) {
      const mode = this._modes().find((m) => m.id === category);
      if (mode !== undefined) {
        // console.log('mode', mode);

        // console.log('category',   category);

        this.selectedMode.set(mode);
      }
      this.selectedMode.set({
        id: 'now',
        name: 'Now',
        endUrl: '',
        queryParm: 'dates/list',
      });
    }
  }
  private _applyLocationParam(location?: string) {
    if (location && this._locations().length > 0) {
      console.log('location', location);

      const loc = this._locations().find((l) => l.id === Number(location));
      if (loc !== undefined) {
        this.selectedLocation.set(loc);
      } else {
        this.selectedLocation.set({
          id: -1,
          name: 'All',
          items: [],
        });
      }
    }
  }
  private _applyDateParam(date?: string) {
    this.selectedDay.set(date!);
    if (date) {
      const isValidDay = this._days().some((d) => d === date);
      if (isValidDay) this.selectedDay.set(date);
    }
  }
  private async initializeData() {
    // if (this._isInitialized) return;
    try {
      this.modesLoading.set(true);
      this.locationsLoading.set(true);

      const [modes, locations] = await Promise.all([
        this.getModes.execute(),
        this.getLocations.execute(),
      ]);

      this._modes.set(modes);
      this._locations.set(locations);

      // Prvo primijeni URL params, pa onda default vrijednosti
      this.readInitialParams();
      // console.log('URL params:', this.route.snapshot.queryParams);
      console.log('changeDetector', this.changeDetector());

      // Postavi default samo ako nema URL params
      if (!this.selectedMode() && modes.length > 0) {
        this.selectedMode.set(modes[0]);
      }
      if (!this.selectedLocation() && locations.length > 0) {
        this.selectedLocation.set(locations[0]);
      }

      // Postavi početne vrijednosti
      // this.selectedMode.set(modes[0] || null);
      // this.selectedLocation.set(locations[0] || null);

      // // Sync sa URL parametrima
      // this.readInitialParams();
      // Sync sa URL parametrima NAKON inicijalizacije
      // this.applyUrlParams(this.route.snapshot.queryParams); // Dodajte ovo
    } catch (error) {
      console.log('Error fetching initial data:', error);

      this.modesError.set(error as Error);
      this.locationsError.set(error as Error);
    } finally {
      this.modesLoading.set(false);
      this.locationsLoading.set(false);
    }
    this._isInitialized = true;
  }

  private setupReactiveUpdates() {
    let lastValue = this.changeDetector();
    // Automatsko dobavljanje dana
    effect(async () => {
      // const currentValue = this.changeDetector();
      // const change = Object.entries(currentValue).reduce((acc, key) => {
      //   acc[key[0] as keyof typeof currentValue] =
      //     key[1] !== lastValue[key[0] as keyof typeof currentValue];
      //   return acc;
      // }, {} as Record<string, boolean>);
      // console.log('Change:', change);

      // const mode = this.selectedMode();
      // const location = this.selectedLocation();
      const { endUrl, queryParams } = this.dateQueryParamsAndEndUrl();
      console.log('aaaaa.....', endUrl, queryParams);
      console.log('endUrl', endUrl);
      if (endUrl.length === 0) return;
      // const isChangeMode =
      // if (!mode) return;

      // if (mode && location) {
      try {
        this.daysLoading.set(true);
        this.daysError.set(null);
        // const { endUrl, queryParams } = this.dateQueryParamsAndEndUrl();

        const days = await this.getDays.execute(endUrl, queryParams);
        this._days.set(days);

        const selDate = this.selectedDay();
        if (selDate) {
          const isValidDay = days.some((d) => d.startsWith(selDate));
          if (!isValidDay) {
            this.selectedDay.set(days[0]);
          }
        } else {
          this.selectedDay.set(days[0]);
        }
      } catch (error) {
        console.log('Error fetching initial data:', error);
        this.daysError.set(error as Error);
        this._days.set([]);
      } finally {
        this.daysLoading.set(false);
      }
      // }
    });

    // Automatsko dobavljanje filmova
    effect(async () => {
      const mode = this.selectedMode();
      const location = this.selectedLocation();
      const day = this.selectedDay();
      // console.log('Selected day:', day);

      if (mode && location && day) {
        try {
          this.moviesLoading.set(true);
          this.moviesError.set(null);
          const { endUrl, queryParams } = this.moviesQueryParamsAndEndUrl();

          const movies = await this.getMovies.execute(endUrl, queryParams);
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

  private _setupUrlSync() {
    // Ažuriranje URL-a na promjenu selektcija
    effect(() => {
      const params = this.changeParams();
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });

    // Praćenje promjena URL parametara
    this.route.queryParams.subscribe((params) => this.applyUrlParams(params));
  }

  private setupUrlSyncNow() {
    // let initialLoad = true;
    effect(() => {
      const params: any = {};

      if (this.selectedMode()) {
        params.category = this.selectedMode()!.id;

        if (this.selectedMode()!.id !== 'upcoming' && this.selectedLocation()) {
          params.location =
            this.selectedLocation()!.id === -1
              ? 'all'
              : this.selectedLocation()!.id;
        }
      }

      if (this.selectedDay()) {
        params.date = this.selectedDay()!.split('T')[0];
      }

      // Zaobiđi inicijalni dupli poziv
      // if (Object.keys(params).length === 0) return;
      // if (initialLoad) {
      //   initialLoad = false;
      //   return;
      // }

      console.log('Navigating with params:', params);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: params,
        // queryParamsHandling: 'merge',
        queryParamsHandling: 'replace',
        replaceUrl: true,
      });
    });
  }

  private readInitialParams() {
    const params = this.route.snapshot.queryParams;
    console.log('params', params);
    this.applyUrlParams(params);
  }

  private applyUrlParams(params: any) {
    // Ažuriraj mode samo ako postoji u dostupnim modovima
    // console.log('params', params);
    // Posebna logika za 'all' lokaciju
    console.log('params', params);
    console.log('changeDetector', this.changeDetector());

    if (params['location'] === 'all') {
      const allLocation = this._locations().find((l) => l.id === -1);
      if (allLocation) this.selectedLocation.set(allLocation);
      return;
    }

    console.log('Applied params:', {
      category: params['category'],
      location: params['location'],
      date: params['date'],
    });

    if (params['category']) {
      const mode = this._modes().find((m) => m.id === params['category']);
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
    // if (params['date']) {
    //   const day = new Date(params['date']);
    //   if (!isNaN(day.getTime())) {
    //     const isValidDay = this._days().some(
    //       (d) => d.split('T')[0] === day.toISOString().split('T')[0]
    //     );
    //     if (isValidDay) this.selectedDay.set(day.toISOString().split('T')[0]);
    //   }
    // }
    if (params['date']) {
      const isoDate = `${params['date']}`;
      // console.log('isoDate', isoDate);

      const isValidDay = this._days().some((d) => d.startsWith(params['date']));
      if (isValidDay) this.selectedDay.set(isoDate);
    }
    console.log('changeDetector', this.changeDetector());
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
