import { Component, inject, input } from '@angular/core';
import { Seat } from '../../../../core/models';
import { CommonModule } from '@angular/common';
import { ProjectionService } from '../../../../core/services/projection.service';
import { ReservationService } from '../../../../core/services/reservation.service';

@Component({
  selector: 'app-seat-reservation',
  imports: [CommonModule],
  templateUrl: './seat-reservation.component.html',
  styleUrl: './seat-reservation.component.scss',
})
export class SeatReservationComponent {
  private readonly _projectionService = inject(ProjectionService);
  private readonly _service = inject(ReservationService);
  seats = this._projectionService.selectedSeats;
  // seats = this._service.seatsAll;
  countSeats = this._service.selectedSeatsCount;
  //  seats = input<Seat[][] | undefined>(undefined);

  toggleSeat(seat: Seat) {
    if (seat.status === 'reserved') {
      return;
    }
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
    this._service.changeSeatStatus(seat);
  }
  confirmReservation() {
    // Logic to confirm the reservation
    console.log('Reservation confirmed!');
  }
}
