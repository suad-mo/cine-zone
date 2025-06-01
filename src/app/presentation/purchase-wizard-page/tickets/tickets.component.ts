import { Component, inject } from '@angular/core';
import { PurchaseWizardState } from '../../../infrastructure/states/purchase-wizard.state';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule, ButtonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent {
  private _state = inject(PurchaseWizardState);
  private readonly _ruter = inject(Router);
  sheduledMovieSession = this._state.sheduledMovieSession;


  async openSeats() {
    const id = this._state.id();
    this._ruter.navigate(['purchase/wizard', id, 'seats'], {
      queryParams: {},
    });
    // await this._state.serAreaAndSeatPlan();
  }
}
