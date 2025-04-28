import { Component, computed, inject, NgModule, OnInit } from '@angular/core';
import { ProjectionService } from '../../../../core/services/projection.service';
import { CinemaService } from '../../../../core/services/cinema.service';
import { Film, Location, Projection } from '../../../../core/models';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { SelectDateComponent } from '../../../../shared/components/select-date/select-date.component';
import { SelectLocationComponent } from '../../../../shared/components/select-location/select-location.component';
@Component({
  selector: 'app-projections',
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    SelectDateComponent,
    SelectLocationComponent,
  ],
  templateUrl: './projections.component.html',
  styleUrl: './projections.component.scss',
})
export class ProjectionsComponent implements OnInit {
  private service = inject(ProjectionService);
  private cinemaService = inject(CinemaService);

  locations = this.cinemaService.locations;

  projections = this.service.filteredProjections;
  dates = this.service.availableDates;
  locs = this.service.availableLocations;
  selectedDate = this.service.selectedDate;
  selectedHallId = this.service.selectedHallId;

  selectedLocationId = this.service.selectedLocationId;

  get selectedLocation(): Location | undefined {
    return this.service.selectedLocation() ?? undefined;
  }

  set selectedLocation(location: Location | undefined) {
    this.service.setSelectedIdLocation(location ? location.id : null);
  }
  // selectedLocation = this.service.;

  getProjectionsForDate(date: string): Projection[] {
    return this.service.getProjectionsForDate(date);
  }

  // getProjetionForLocation(locationId: number): Projection[] {
  //   return this.service.getProjectionsForLocation(locationId);
  // }

  getFilmTitle(filmId: number): string {
    return this.service.getFilmTitle(filmId);
  }

  getFilmById = (filmId: number): Film | undefined =>
    this.service.getFilmById(filmId);

  viewDetails(id: number) {
    console.log(`View details for projection with ID: ${id}`);
  }

  ngOnInit(): void {

  }
}
