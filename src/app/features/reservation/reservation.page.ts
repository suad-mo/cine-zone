import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ProjectionService } from '../../core/services/projection.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SeatReservationComponent } from './components/seat-reservation/seat-reservation.component';
import { ReservationService } from '../../core/services/reservation.service';
import { CheckedReservationComponent } from './components/checked-reservation/checked-reservation.component';
import { PayReservationComponent } from './components/pay-reservation/pay-reservation.component';
import { EndReservationComponent } from './components/end-reservation/end-reservation.component';

@Component({
  selector: 'app-reservation-page',
  imports: [
    Breadcrumb,
    CommonModule,
    ButtonModule,
    SeatReservationComponent,
    CheckedReservationComponent,
    PayReservationComponent,
    EndReservationComponent,
  ],
  templateUrl: './reservation.page.html',
  styleUrl: './reservation.page.scss',
  standalone: true,
})
export class ReservationPage implements OnInit {
  private readonly _route = inject(ActivatedRoute); // Inject ActivatedRoute
  private readonly _reservationService = inject(ReservationService);
  // pojection = this._reservationService.projection;
  location = this._reservationService.location;
  hall = this._reservationService.hall;
  film = this._reservationService.film;

  data = this._reservationService.reservationDataView;
  user = computed(() => this.data().user);

  // orderedSeats = this._reservationService.orderedSeats;
  orderedSeats = computed(() => this._reservationService.orderedSeats());
  selectedSeatsCount = this._reservationService.selectedSeatsCount;

  home: MenuItem | undefined;
  level = signal<number>(0); // Corrected property name

  disabled = computed(() => {
    if (this.level() === 0 && this.orderedSeats() > 0) {
      return false;
    }
    if (
      this.level() === 1 &&
      this.orderedSeats() === this.selectedSeatsCount()
    ) {
      return false;
    }
    if (this.level() === 2 && this.orderedSeats() > 0 && this.user()) {
      return false;
    }
    if (this.level() === 3 && this.user()) {
      return false;
    }
    return true;
  });

  items = computed(() => {
    const its: MenuItem[] = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => this.level.set(0),
      },
    ];
    if (this.level() >= 1) {
      its.push({
        label: 'Sjedišta',
        icon: 'pi pi-fw pi-video',
        command: () => this.level.set(1),
      });
    }
    if (this.level() >= 2) {
      its.push({
        label: 'Potvrda narudžbe',
        icon: 'pi pi-fw pi-calendar',
        command: () => this.level.set(2),
      });
    }
    if (this.level() >= 3) {
      its.push({
        label: 'Plati',
        icon: 'pi pi-fw pi-ticket',
        command: () => this.level.set(3),
      });
    }
    return its;
  });

  constructor() {
    effect(() => {
      // console.log('level', this.level());
      // console.log('disabled', this.disabled());
      // console.log('brojKarata', this.orderedSeats());
      console.log('orderedSeats', this.selectedSeatsCount());
      // console.log('disabled', this.disabled());
    });
  }
  ngOnInit() {
    const idProjection = this._route.snapshot.queryParams['idProjection'];
    if (!this.film()) {
      this._reservationService.setProjectionById(
        Number(idProjection) // Convert to number if needed;
      );
    }
  }

  onPlus() {
    if (this.orderedSeats() < 10) {
      this._reservationService.increaseReservedSeatsCount();
    }
  }

  onMinus() {
    this._reservationService.decreaseReservedSeatsCount();
  }

  onDalje() {
    this.level.update((prev) => prev + 1);
  }

  onNazad() {
    this.level.update((prev) => {
      if (prev < 2) {
        this._reservationService.resetSelectedSeats();
      }
      return prev > 1 ? prev - 1 : 0;
    });
  }
}
