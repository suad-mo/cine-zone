import { Component, inject } from '@angular/core';
import { CinemaService } from '../../../../core/services/cinema.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-events',
  imports: [CommonModule],
  templateUrl: './home-events.component.html',
  styleUrl: './home-events.component.scss'
})
export class HomeEventsComponent {
  private readonly _cinemaService = inject(CinemaService);
  readonly wizard = this._cinemaService.resWizard;

}
