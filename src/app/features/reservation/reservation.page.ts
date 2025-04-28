import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ProjectionService } from '../../core/services/projection.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SeatReservationComponent } from './components/seat-reservation/seat-reservation.component';
import { ReservationService } from '../../core/services/reservation.service';

@Component({
  selector: 'app-reservation-page',
  imports: [Breadcrumb, CommonModule, ButtonModule, SeatReservationComponent],
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

  brojKarata = this._reservationService.orderedSeats

  home: MenuItem | undefined;
  level = signal<number>(0); // Corrected property name
  items = computed(() => {
    const its: MenuItem[] = [{ label: 'Home', icon: 'pi pi-fw pi-home' }];
    if (this.level() >= 1) {
      its.push({ label: 'Sjedišta', icon: 'pi pi-fw pi-video' });
    }
    if (this.level() >= 2) {
      its.push({ label: 'Kupovina/Rezervacija', icon: 'pi pi-fw pi-calendar' });
    }
    if (this.level() >= 3) {
      its.push({ label: 'Plati', icon: 'pi pi-fw pi-ticket' });
    }
    return its;
  });

  constructor() {}
  ngOnInit() {
    const idProjection = this._route.snapshot.queryParams['idProjection'];
    if (!this.film()) {
      this._reservationService.setProjectionById(
        Number(idProjection) // Convert to number if needed;
      );
    }
  }

  onPlus() {
    if (this.brojKarata() < 10) {
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
    this.level.update((prev) => (prev > 1 ? prev - 1 : 0));
  }
}
