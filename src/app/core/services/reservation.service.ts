import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Film, Hall, Location, Projection, Seat } from '../models';
import { ProjectionService } from './projection.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly _projectionService = inject(ProjectionService);
  film = this._projectionService.selectedFilm;
  // location = this._projectionService.selectedLocation;
  hall = this._projectionService.selectedHall;
  dateTime = this._projectionService.selectedDate;
  projection = this._projectionService.selectedProjection;

  private readonly _projection = signal<Projection | undefined>(
    this._projectionService.selectedProjection()
  );
  private readonly _film = signal(this._projectionService.selectedFilm());
  // private readonly _location = signal(this._projectionService.selectedLocation());
  private readonly _hall = signal(this._projectionService.selectedHall());
  // private readonly _projection = signal<Projection | undefined>(this._projectionService.selectedProjection());
  private readonly _selectedSeatsCount = signal<number>(0);

  // get projection(): Signal<Projection | undefined> {
  //   return this._projection.asReadonly();
  // }

  // set projection(value: Projection | undefined) {
  //   this._projection.set(value);
  // }

  // get film(): Signal<Film | undefined> {
  //   return this._film.asReadonly();
  // }

  // get location(): Signal<Location | undefined> {
  //   return this._location.asReadonly();
  // }

  // get hall(): Signal<Hall | undefined> {
  //   return this._hall.asReadonly();
  // }

  seatsAll = computed(() => {
    const projection = this._projection();
    if (projection) {
      return projection.seatMap;
    }
    return [];
  });

  seatPrice = computed(() => {
    const projection = this._projection();
    if (projection) {
      return projection.price;
    }
    return 0;
  });

  seatsSelected = computed(() => {
    const seatsAll = this.seatsAll();
    return seatsAll.flatMap((row) =>
      row.filter((seat) => seat.status === 'selected')
    );
  });

  selectedSeatsCount = computed(() => {
    const seatsSelected = this.seatsSelected();
    return seatsSelected.length;
  });

  selectedSeatsPrice = computed(() => {
    const count = this.selectedSeatsCount();
    const seatPrice = this.seatPrice();
    return count * seatPrice;
  });

  changeSeatStatus(seat: Seat) {
    if (seat.status === 'reserved') {
      return;
    }
    if (seat.status === 'selected') {
      this._projection.update((pre) => {
        if (pre) {
          pre.seatMap[seat.row][seat.column].status = 'available';
          return pre;
        }
        return pre;
      });
    }
    if (seat.status === 'available') {
      this._projection.update((pre) => {
        if (pre) {
          pre.seatMap[seat.row][seat.column].status = 'selected';
          return pre;
        }
        return pre;
      });
    }
  }

  /// Povećanje broja rezervisanih mesta
  increaseReservedSeatsCount() {
    this._selectedSeatsCount.update((count) => count + 1);
  }
  /// Smanjenje broja rezervisanih mesta
  decreaseReservedSeatsCount() {
    this._selectedSeatsCount.update((count) => (count > 0 ? count - 1 : 0));
  }

  constructor() {}
}
