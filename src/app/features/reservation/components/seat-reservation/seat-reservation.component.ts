import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
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
  private readonly _reservationService = inject(ReservationService);
  seats = this._reservationService.seatsAll;
  countSeats = this._reservationService.selectedSeatsCount;
  selectedSeats = this._reservationService.seatsSelected;
  ordreredSeats = this._reservationService.orderedSeats;

  constructor() {
    effect(() => {
      console.log('seatsSel', this.selectedSeats());
      console.log('countSeatsaaaa', this.countSeats());
      console.log('orderedSeats', this.ordreredSeats());
    });
  }
  toggleSeat(seat: Seat) {
    if (this.ordreredSeats()===this.countSeats() && seat.status === 'available') return;
    if (seat.status === 'reserved') {
      return;
    }
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
    this._reservationService.changeSeatStatus(seat);
  }
  confirmReservation() {
    // Logic to confirm the reservation
    console.log('Reservation confirmed!');
  }
}
