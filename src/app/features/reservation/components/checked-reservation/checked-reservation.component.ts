import { Component, computed, inject, input } from '@angular/core';
// import { Film, Hall, Location, Seat } from '../../../../core/models';
import { ReservationService } from '../../../../core/services/reservation.service';
import { CardModule } from 'primeng/card';
import { CommonModule, DatePipe } from '@angular/common';
// import { Button } from 'primeng/button';
import { format } from 'date-fns';
import { bs } from 'date-fns/locale';

@Component({
  selector: 'app-checked-reservation',
  imports: [CommonModule, CardModule],
  templateUrl: './checked-reservation.component.html',
  styleUrl: './checked-reservation.component.scss',
})
export class CheckedReservationComponent {
  readonly data = inject(ReservationService).reservationDataView;

  readonly parsedDate = computed(() => {
    const stringDateTime = this.data().dateTime;
    const date = new Date(stringDateTime);
    if (!isNaN(date.getTime())) {
      const fomatted = format(date, 'd MMMM, EEEE', { locale: bs });
      return fomatted; // Kapitalizacija
    }
    return null;
  });

  readonly parsedTime = computed(() => {
    const stringDateTime = this.data().dateTime;
    const date = new Date(stringDateTime);
    if (!isNaN(date.getTime())) {
      const fomatted = format(date, 'HH:SS', { locale: bs });
      return fomatted; // Kapitalizacija
    }
    return null;
  });


  onProceedToPayment() {
    console.log('Proceeding to payment...');
  }
}
