import { computed, Injectable, signal } from '@angular/core';
import { CinemaLocation } from '../../core/entities/cinema-location.entity';
import { GetLocationsUseCase } from '../../core/use-cases/get-cinema-locations.use-case';

@Injectable({
  providedIn: 'root',
})
export class LocationsState {
  private _isLoadedLocations = signal<boolean>(false);
  private _locations = signal<CinemaLocation[]>([]);
  private _selectedIdLocation = signal<string | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<Error | null>(null);

  selectedLocation = computed(() => {
    const locations = this._locations();
    const selectedId = Number(this._selectedIdLocation() || '-1');

    if (!isNaN(selectedId)) {
      return locations.find((location) => location.id === selectedId) || null;
    } else {
      return { id: -1, name: 'All Locations', items: [] } as CinemaLocation;
    }
  });

  listLocations = computed(() => {
    const { label, value } = {
      label: 'All Locations',
      value: 'all',
    };
    const lst = this._locations().map((location) => ({
      label: location.name,
      value: location.id.toString(),
    }));
    return [{ label, value }, ...lst];
  });


  readonly locations = this._locations.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private getLocationsUseCase: GetLocationsUseCase) {
    this._loadLocations();
    // .then(() => {
    //   console.log('Locations loaded successfully');
    // }).catch((error) => {
    //   console.error('Error loading locations:', error);
    //   this._error.set(error as Error);
    // });
  }

  async _loadLocations(): Promise<void> {
    try {
      // console.log('Loading locations...');

      if (this._isLoadedLocations() && this._locations().length> 0) {
        return; // Locations already loaded
      }
      this._loading.set(true);
      const locations = await this.getLocationsUseCase.execute();
      this._locations.set(locations);
      // this._isLoadedLocations.set(true);
    } catch (error) {
      this._error.set(error as Error);
      console.error('Error loading locations:', error);
    } finally {
      this._loading.set(false);
    }
  }

  // get selectedIdLocation(): string {
  //   return this._selectedIdLocation() || 'all';
  // }

  // set selectedIdLocation(id: string) {
  //   const value = this.listLocations().find((location) => location.value === id)?.value || 'all';
  //   this._selectedIdLocation.set(value);
  // }

}
