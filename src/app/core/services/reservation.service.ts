import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
} from '@angular/core';
import { Film, Hall, Location, Projection, Seat } from '../models';
import { ProjectionService } from './projection.service';
import { se } from 'date-fns/locale';
// import { ReservationDataView } from '../models/reservation.model';
import { UserService } from './user.service';
import { Reservation, ReservationDataView } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly _projectionService = inject(ProjectionService);
  private readonly _userService = inject(UserService);
  // Privatni lokalni signal za projekciju
  private readonly _projection = signal<Projection | undefined>(
    this._projectionService.selectedProjection()
  );
  // Ostali getter-i: koriste servis
  readonly film = this._projectionService.selectedFilm;
  readonly hall = this._projectionService.selectedHall;
  readonly dateTime = this._projectionService.selectedDate;
  readonly location = this._projectionService.selectedLocation;

  readonly user = computed(() => this._userService.getCurrentUser());
  readonly projection = computed(() =>
    this._projectionService.selectedProjection()
  );
  // Svi redovi i sjedala
  readonly seatsAll = computed(() => this._projection()?.seatMap);

  // Cijena jednog mjesta
  readonly seatPrice = computed(() => this._projection()?.price ?? 0);

  // Sva odabrana sjedala
  readonly seatsSelected = computed(
    () =>
      this.seatsAll()?.flatMap((row) =>
        row.filter((seat) => seat.status === 'selected')
      ) ?? []
  );

  resetSelectedSeats(){
    this.seatsSelected().map((seat) => {
      const newSeatMap = <Seat>{ row: seat.row, column: seat.column, status: 'available' };
      return newSeatMap;
    }).forEach((seat) => {
      this.changeSeatStatus(seat);
    });
    // this.orderedSeats.set(0);
  }

  // Broj odabranih sjedala
  readonly selectedSeatsCount = computed(() => this.seatsSelected().length);

  // Ukupna cijena odabranih sjedala
  readonly selectedSeatsPrice = computed(
    () => this.selectedSeatsCount() * this.seatPrice()
  );

  // Podaci za rezervaciju
  readonly reservationDataView = computed(() => {
    return <ReservationDataView>{
      id: 1,
      user: this.user() ?? undefined,
      projection: this._projection(),
      film: this.film(),
      location: this.location(),
      hall: this.hall(),
      dateTime: this._projection()?.dateTime,
      seats: this.seatsSelected(),
      price: this.selectedSeatsPrice(),
    };
  });

  readonly getReservation = computed(() => {
    return <Reservation>{
      id: 1,
      userId: this.user()?.id ?? 0,
      projectionId: this._projection()?.id ?? 0,
      seats: this.seatsSelected() ?? [],
      price: this.selectedSeatsPrice() ?? 0,
    };
  });

  constructor() {
    effect(() => {
      this._projection.set(this._projectionService.selectedProjection());
    });
  }

  readonly orderedSeats = signal<number>(0);

  seatsMap = computed(() => {
    return this._projection()?.seatMap;
  });

  // Funkcija za promjenu statusa sjedala
  changeSeatStatus(seat: Seat) {
    this._projection.update((projection) => {
      if (!projection) return projection;
      const newSeatMap = projection.seatMap.map((row) =>
        row.map((col) => {
          if (col.row === seat.row && col.column === seat.column) {
            return seat;
          }
          return col;
        })
      );
      const newProj = {
        ...projection,
        seatMap: [...newSeatMap],
      };
      return newProj;
    });
  }

  /// Povećanje broja rezervisanih mesta
  increaseReservedSeatsCount() {
    this.orderedSeats.update((count) => (count < 10 ? count + 1 : 10));
  }
  /// Smanjenje broja rezervisanih mesta
  decreaseReservedSeatsCount() {
    this.orderedSeats.update((count) => (count > 0 ? count - 1 : 0));
  }

  // Removed duplicate constructor

  setProjectionById(id: number) {
    this._projectionService.setSelectedIdProjection(id);
  }

  resetAllDataAfterPay() {
    this._projectionService.resetAll();
  }
}
