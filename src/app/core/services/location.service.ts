import { computed, Injectable, signal } from '@angular/core';
import { Location } from '../models';
import { MOCK_LOCATIONS } from '../mock/mock-locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations = signal<Location[]>(MOCK_LOCATIONS);
  selectedLocationId = signal<number | null>(null);

  selectedLocation = computed(() => {
    const id = this.selectedLocationId();
    if (id === null) {
      return undefined;
    }
    const location = this.locations().find((l) => l.id === id) || undefined;
    return location;
  });

  selectLocationId(id: number | null) {
    this.selectedLocationId.set(id);
  }

  constructor() { }
}
