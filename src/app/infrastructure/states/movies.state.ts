import { Injectable, computed, effect, signal } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetAvailableDaysUseCase } from '../../core/use-cases/get-available-days.use-case';
import { GetMoviesUseCase } from '../../core/use-cases/get-movies.use-case';
import { Movie } from '../../core/entities/movie.entity';
import { DisplayMode } from '../../core/entities/display-mode.entity';
import { CinemaLocation } from '../../core/entities/cinema-location.entity';
// import { GetDisplayModesUseCase } from '../../core/use-cases/get-display-modes.use-case';
import { GetLocationsUseCase } from '../../core/use-cases/get-cinema-locations.use-case';
import { bs, ca, id, se } from 'date-fns/locale';
import { format } from 'date-fns';
import { GetDisplayModesUseCase } from '../../core/use-cases/get-display-modes.use-case';
@Injectable({ providedIn: 'root' })
export class MoviesState {

  private _isInitialLoadModesAndLocations = signal<boolean>(false);
  private _goEffect = false;
  init = signal<boolean>(true);
  // Stanje podataka
  private _modes = signal<DisplayMode[]>([]);
  // private _locations = signal<CinemaLocation[]>([]);
  private _days = signal<string[]>([]);
  private _movies = signal<Movie[]>([]);

  // Selektovane vrijednosti
  selectedMode = signal<DisplayMode | null>(null);
  // selectedLocation = signal<CinemaLocation | null>(null);
  // selectedDay = signal<string | null>(null);

  selectedIdMode = signal<string>('now');
  selectedModeNew = computed(() => {
    const initMode: DisplayMode = {
      id: 'now',
      name: 'Now',
      endUrl: '',
      queryParm: 'dates/list',
    };
    const modes = this._modes();
    const selectedId = this.selectedIdMode();
    const mode = modes.find((m) => m.id === selectedId);
    return mode || initMode;
  });

  private _selectedIdLocation = signal<string | null>(null);
  readonly selectedIdLocation = this._selectedIdLocation.asReadonly();


  setLocationId(locationId: string | null) {
    this._selectedIdLocation.set(locationId);
    console.log('Sets locationId:', locationId);
  }

  selectedDate = signal<string | null>(null);
  listDate = computed(() => {
    const dates = this._days();
    if (!this.isUpcoming()) {
      return dates.map((date) => {
        let formatted = '';
        const dateObj = new Date(date);
        const now = new Date();
        const value = date.split('T')[0];
        const isToday = dateObj.toDateString() === now.toDateString();
        const isTomorrow =
          new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
          dateObj.toDateString();
        if (isToday) {
          formatted = 'Danas';
        } else if (isTomorrow) {
          formatted = format(dateObj, 'd MMMM', { locale: bs }) + ', Sutra';
        } else {
          formatted = format(dateObj, 'd MMMM, EEEE', { locale: bs });
        }
        return {
          label: this._capitalize(formatted), // Kapitalizacija
          value, // Originalni datum
        };
      });
    } else {
      const dateYear = new Date().getFullYear().toString();
      const { label, value } = {
        label: `Godina ${dateYear}`,
        value: 'all',
      };
      const lst = dates.map((date) => {
        let formatted = '';
        const dateObj = new Date(date);
        const now = new Date();
        const value = date; //.split('T')[0];
        const isCurrentMonth =
          dateObj.getMonth() === now.getMonth() &&
          dateObj.getFullYear() === now.getFullYear();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const year = dateObj.getFullYear();
        formatted = isCurrentMonth ? 'Trenutni mjesec' : month;
        return {
          label: formatted, // Formatiranje mjeseca i godine
          value, // Originalni datum
        };
      });
      return [{ label, value }, ...lst];
    }
  });
  private _capitalize(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Loading stanja
  private modesLoading = signal(false);
  private locationsLoading = signal(false);
  private daysLoading = signal(false);
  private moviesLoading = signal(false);
  private datesLoading = signal(false);

  // Error stanja
  private modesError = signal<Error | null>(null);
  private locationsError = signal<Error | null>(null);
  private daysError = signal<Error | null>(null);
  private moviesError = signal<Error | null>(null);
  private datesError = signal<Error | null>(null);

  // Readonly izloženo stanje
  readonly modes = this._modes.asReadonly();
  // readonly locations = this._locations.asReadonly();
  readonly days = this._days.asReadonly();
  readonly movies = this._movies.asReadonly();
  readonly dates = this._days.asReadonly();

  // Ovoaj interfejs postavlja početne vrijednosti na null
  private previousParam = {
    mode: null as DisplayMode | null,
    location: null as CinemaLocation | null,
    day: null as string | null,
  };

  readonly changeDetector = computed(() => ({
    mode: this.selectedModeNew(),
    location: this.selectedIdLocation(),
    date: this.selectedDate(),
  }));

  readonly isUpcoming = computed(() => this.selectedIdMode() === 'upcoming');

  readonly changeParams = computed(() => {
    const category = this.selectedIdMode();
    const location = this.selectedIdLocation();
    const date = this.selectedDate();
    let params: Params = {};
    if (date) {
      params = {
        ...params,
        date,
      };
    }
    if (category) {
      params = {
        ...params,
        category,
      };
    }
    if (category !== 'upcoming' && location) {
      params = {
        ...params,
        location,
      };
    }
    // console.log('changeParams', params);

    return params;
  });

  readonly dateQueryParamsAndEndUrl = computed(() => {
    const mode = this.selectedModeNew();
    // const location = this.selectedLocationNew();
    const idLocation = this.selectedIdLocation();
    const loc = idLocation || 'all'
    // location
    //   ? location!.id === -1
    //     ? 'all'
    //     : location!.id.toString()
    //   : 'all';
    const queryParams: Params = {};
    let endUrl = 'dates/list';
    if (this.selectedIdMode() === 'top') {
      queryParams['top'] = true;
    }
    if (this.selectedIdMode() === 'upcoming') {
      queryParams['comingSoon'] = true;
      endUrl = 'months/list';
    } else {
      queryParams['location'] = loc;
    }
    return { endUrl, queryParams };
  });

  readonly moviesQueryParamsAndEndUrl = computed(() => {
    const mode = this.selectedModeNew();
    // const locat = this.selectedLocationNew();
    const idLocation = this.selectedIdLocation();
    const date = this.selectedDate();
    const loc = idLocation || 'all';
      // location && location!.id !== -1 ? location!.id.toString() : 'all';
    const endUrl = mode ? mode.endUrl : '';

    let queryParams: Params = {};
    if (date !== 'all') {
      queryParams['date'] = date;
    }
    if (this.isUpcoming()) {
      queryParams['location'] = 'all';
    } else {
      queryParams['location'] = loc;
    }

    return { endUrl, queryParams };
  });

  readonly loadingStates = {
    modes: this.modesLoading.asReadonly(),
    locations: this.locationsLoading.asReadonly(),
    days: this.daysLoading.asReadonly(),
    movies: this.moviesLoading.asReadonly(),
    dates: this.datesLoading.asReadonly(),
  };

  readonly errors = {
    modes: this.modesError.asReadonly(),
    locations: this.locationsError.asReadonly(),
    days: this.daysError.asReadonly(),
    movies: this.moviesError.asReadonly(),
    dates: this.datesError.asReadonly(),
  };

  constructor(
    private getModes: GetDisplayModesUseCase,
    private getLocations: GetLocationsUseCase,
    private getDays: GetAvailableDaysUseCase,
    private getMovies: GetMoviesUseCase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setupReactiveUpdates();
    // effect(() => {
    //   console.log('Change detected:', this.changeDetector());
    // });
  }

  private async _initialLoadModesAndLocations() {
    try {
      if (!this._isInitialLoadModesAndLocations()) {
        this._isInitialLoadModesAndLocations.set(true);
        if (this._modes().length > 0 ) {
          this._isInitialLoadModesAndLocations.set(false);
          return;
        }
      }
      this.modesLoading.set(true);
      this.locationsLoading.set(true);

      const [modes] = await Promise.all([
        this.getModes.execute(),
        // this.getLocations.execute(),
      ]);

      this._modes.set(modes);
      // this._locations.set(locations);
    } catch (error) {
      this.modesError.set(error as Error);
      this.locationsError.set(error as Error);
    } finally {
      this.modesLoading.set(false);
      this.locationsLoading.set(false);
      this._isInitialLoadModesAndLocations.set(false);
    }
  }

  async applyExternalParams(params: Params) {
    if (this._modes().length === 0) {
      await this._initialLoadModesAndLocations();
    }
    this._applyCategoryParam(params['category']);
    this._applyLocationParam(params['location']);
    const { endUrl, queryParams } = this.dateQueryParamsAndEndUrl();
    const days = await this.getDays.execute(endUrl, queryParams);
    this._days.set(days);
    console.log('applyExternalParams days:', days);

    this._applyDateParam(params['date']);

    const movies = await this.getMovies.execute(
      this.moviesQueryParamsAndEndUrl().endUrl,
      this.moviesQueryParamsAndEndUrl().queryParams
    );
    this._movies.set(movies);
    const newParams = this.changeParams();
    // console.log('applyExternalParams newParams:', newParams);
    if (newParams !== params) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: newParams,
        queryParamsHandling: 'replace',
        replaceUrl: true,
      });
    }
    this._goEffect = true;
  }

  private _applyCategoryParam(category?: string) {
    if (category==='now' || category === 'top' || category === 'upcoming') {
      this.selectedIdMode.set(category);
      return;
    }
    const mode = this._modes().find((m) => m.id === category);
    if (!!mode) {
      this.selectedIdMode.set(mode.id);
    } else {
      this.selectedIdMode.set('now');
    }
  }
  private _applyLocationParam(location?: string) {
    // const listLocation = this.listLocation();
    // console.log('location:', location);
    this._selectedIdLocation.set(location || 'all');
    console.log('selectedIdLocation:', this.selectedIdLocation());


    // const loc = listLocation.find((l) => l.value === location);

    // if (!!loc) {
    //   this.selectedIdLocation.set(location || 'all');
    // } else {
    //   this.selectedIdLocation.set('all');
    // }
  }
  private _applyDateParam(date?: string) {
    const listDate = this.listDate();
    if (date) {
      const isValidDay = this.listDate().some((d) => d.value === date);
      if (isValidDay) {
        this.selectedDate.set(date);
      } else {
        this.selectedDate.set(listDate[0].value || null);
      }
    } else {
      this.selectedDate.set(listDate[0].value || null);
    }
  }

  private setupReactiveUpdates() {
    // Automatsko dobavljanje dana
    effect(async () => {
      const { endUrl, queryParams } = this.dateQueryParamsAndEndUrl();
      if (!this._goEffect) return;
      if (endUrl.length === 0) return;
      try {
        this.daysLoading.set(true);
        this.daysError.set(null);
        this.datesLoading.set(true);
        this.datesError.set(null);

        const days = await this.getDays.execute(endUrl, queryParams);
        this._days.set(days);

        const selDate = this.selectedDate();
        if (selDate) {
          const isValidDay = days.includes(selDate);
          if (isValidDay) {
            // this.selectedDay.set(selDate);
            this.selectedDate.set(selDate);
          } else {
            // this.selectedDay.set(days[0]);
            this.selectedDate.set(this.listDate()[0].value || null);
          }
        } else {
          // this.selectedDay.set(days[0]);
          this.selectedDate.set(this.listDate()[0].value || null);
        }
      } catch (error) {
        console.log('Error fetching initial data:', error);
        this.daysError.set(error as Error);
        this.datesError.set(error as Error);
        this._days.set([]);
      } finally {
        this.daysLoading.set(false);
        this.datesLoading.set(false);
      }
      // }
    });

    // Automatsko dobavljanje filmova
    effect(async () => {
      const mode = this.selectedModeNew();
      const location = this.selectedIdLocation();
      // const day = this.selectedDay();
      const date = this.selectedDate();
      if (!this._goEffect) return;

      if (mode && location && date) {
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

    this._setupUrlSync();
  }

  private _setupUrlSync() {
    // Ažuriranje URL-a na promjenu selektcija
    effect(() => {
      const params = this.changeParams();
      if (!this._goEffect) return;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'replace',
        replaceUrl: true,
      });
    });
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
      // this._locations.set(locations);
    } catch (error) {
      this.locationsError.set(error as Error);
    } finally {
      this.locationsLoading.set(false);
    }
  }
}
