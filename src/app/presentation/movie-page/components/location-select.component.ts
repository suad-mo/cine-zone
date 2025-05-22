// presentation/components/location-select.component.ts
import { Component, input, Output, EventEmitter } from '@angular/core';
import { CinemaLocation } from '../../../core/entities/cinema-location.entity';

@Component({
  standalone: true,
  selector: 'app-location-select',
  template: `
    <select
      [value]="selectedId()"
      (change)="onSelect($event)"
      [disabled]="disabled()"
    >
      <option value="" disabled>Select Location</option>
      @for (location of locations(); track location.id) {
        <option [value]="location.id">
          {{ location.id }} - {{ location.name }}
        </option>
      }
    </select>
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
    `
  ]
})
export class LocationSelectComponent {
  locations = input<CinemaLocation[]>([]);
  selectedId = input<string | null>(null);
  disabled = input<boolean>(false);

  @Output() selectedChange = new EventEmitter<CinemaLocation>();

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = Number(selectElement.value);
    const location = this.locations().find(l => l.id === selectedValue);
    if (location) this.selectedChange.emit(location);
  }
}
