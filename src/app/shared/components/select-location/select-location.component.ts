import { Component, inject } from '@angular/core';
import { Select, SelectChangeEvent } from 'primeng/select';
import { ProjectionService } from '../../../core/services/projection.service';
import { CinemaService } from '../../../core/services/cinema.service';
import {
  Location as CinemaLocation,
  Location,
} from '../../../core/models/location.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-location',
  imports: [Select, FormsModule],
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.scss',
})
export class SelectLocationComponent {
  private service = inject(ProjectionService);
  private cinemaService = inject(CinemaService);

  locations = this.cinemaService.locations;

  get selectedLocation(): Location | undefined {
    return this.service.selectedLocation() ?? undefined;
  }

  set selectedLocation(location: Location | undefined) {
    this.service.setSelectedLocation(location ? location.id : null);
  }

  onChangeLocation(event: SelectChangeEvent): void {
    const selectedLoc = event.value as Location | null;
    if (!selectedLoc) return;
    this.service.selectedLocationId.set(selectedLoc.id);
  }
}
