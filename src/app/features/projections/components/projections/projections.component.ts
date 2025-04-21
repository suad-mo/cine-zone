import { Component, inject } from '@angular/core';
import { ProjectionService } from '../../../../core/services/projection.service';
import { Film, Projection } from '../../../../core/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projections',
  imports: [CommonModule],
  templateUrl: './projections.component.html',
  styleUrl: './projections.component.scss'
})
export class ProjectionsComponent {
  private service = inject(ProjectionService);

  projections = this.service.filteredProjections;
  dates = this.service.availableDates;
  selectedDate = this.service.selectedDate;
  selectedHallId = this.service.selectedHallId;

  getProjectionsForDate(date: string): Projection[] {
    return this.service.getProjectionsForDate(date);
  }

  getFilmTitle(filmId: number): string {
    return this.service.getFilmTitle(filmId);
  }

  getFilmById = (filmId: number): Film | undefined => this.service.getFilmById(filmId);

  onDateChange(e: Event) {
   const date: string | null = (e.target as HTMLSelectElement).value;
    if (!date) return;
    this.service.setSelectedDate(date);
  }

  onHallChange(e: Event) {
    const hallId: string | null = (e.target as HTMLSelectElement).value;
    const id = hallId ? parseInt(hallId) : null;
    if(!id) return;
    this.service.setSelectedHall(id);
  }

}
