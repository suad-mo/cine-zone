import { Component, computed, inject } from '@angular/core';
import { CinemaService } from '../../../../core/services/cineplexx/cinema.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-events',
  imports: [CommonModule],
  templateUrl: './home-events.component.html',
  styleUrl: './home-events.component.scss',
  standalone: true,
})
export class HomeEventsComponent {
  private readonly _cinemaService = inject(CinemaService);
  readonly wizard = this._cinemaService.resWizard;
  readonly seatPlan = this._cinemaService.seatPlan;

  //https://app.cineplexx.ba/static/area_categories/occupied-double.svg
  readonly listIcon = computed(() => {
    const list = this.seatPlan()?.icons;
    if (!list) return [];
    const listIcons = list.map(
      (icon) => 'https://app.cineplexx.ba' + icon.imageUrl
    );
    return listIcons;
  });
}
