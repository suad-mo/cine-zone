import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { LocationsState } from '../../../infrastructure/states/locations.state';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-select',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './location-select.component.html',
  styleUrl: './location-select.component.scss',
  providers: [],
})
export class LocationSelectComponent {
  @Output() selectedChange = new EventEmitter<string>();
  private _locationsState = inject(LocationsState)
  private readonly _locations = this._locationsState.locations;
  selectedIdLocation = input<string | null>(null);


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

}
