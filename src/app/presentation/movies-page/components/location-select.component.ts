// presentation/components/location-select.component.ts
import { Component, input, Output, EventEmitter, inject } from '@angular/core';
import { MoviesState } from '../../../infrastructure/states/movies.state';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-location-select',
  imports: [CommonModule, FormsModule, Select],
  template: `
    <p-select
      [options]="listLocation()"
      optionLabel="label"
      optionValue="value"
      [(ngModel)]="selectedIdLocation"
      class="w-64 rounded-xl shadow-md border-gray-300"
      placeholder="Odaberite Disply Mode"
      [panelStyle]="{ borderRadius: '0.75rem' }"

    ></p-select>
  `,
  styles: [
    `
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
      }
    `,
  ],
})
export class LocationSelectComponent {
  private readonly _state = inject(MoviesState);
  listLocation = this._state.listLocation;
  selectedIdLocation = this._state.selectedIdLocation;

  disabled = input<boolean>(false);

  @Output() selectedChange = new EventEmitter<string>();

}
