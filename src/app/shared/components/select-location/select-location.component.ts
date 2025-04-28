import { Component, inject } from '@angular/core';
import { Select, SelectChangeEvent } from 'primeng/select';
import { ProjectionService } from '../../../core/services/projection.service';
import { CinemaService } from '../../../core/services/cinema.service';
import { Location } from '../../../core/models/location.model';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-select-location',
  imports: [Select, FormsModule],
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.scss',
})
export class SelectLocationComponent {
  private service = inject(ProjectionService);
  // private cinemaService = inject(CinemaService);
  // locations = this.cinemaService.locations;

  private locationService = inject(LocationService);
  locations = this.locationService.locations;

  get selectedLocation(): Location | undefined {
    return this.service.selectedLocation() ?? undefined;
  }

  set selectedLocation(location: Location | undefined) {
    this.service.setSelectedIdLocation(location ? location.id : null);
  }
  // set selectedLocation(location: Location | undefined) {
  //   this.service.setSelectedIdLocation(location ? location.id : null);
  // }

  onChangeLocation(event: SelectChangeEvent): void {
    const selectedLoc = event.value as Location | null;
    if (!selectedLoc) return;
    this.service.selectedLocationId.set(selectedLoc.id);
  }
}
