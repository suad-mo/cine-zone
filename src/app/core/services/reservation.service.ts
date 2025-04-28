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

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly _projectionService = inject(ProjectionService);
  // Privatni lokalni signal za projekciju
  private readonly _projection = signal<Projection | undefined>(
    this._projectionService.selectedProjection()
  );
  // Ostali getter-i: koriste servis
  readonly film = this._projectionService.selectedFilm;
  readonly hall = this._projectionService.selectedHall;
  readonly dateTime = this._projectionService.selectedDate;
  readonly location = this._projectionService.selectedLocation;


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

  // readonly kokikoSelektovanih = computed(() => {
  //   let i = 0;
  //   this.seatsAll()?.forEach((row) =>
  //     row.forEach((col) => {
  //       if (col.status === 'selected') {
  //         ++i;
  //       }
  //     })
  //   );
  //   return i;
  // });

  // Broj odabranih sjedala
  readonly selectedSeatsCount = computed(() => this.seatsSelected().length);

  // Ukupna cijena odabranih sjedala
  readonly selectedSeatsPrice = computed(
    () => this.selectedSeatsCount() * this.seatPrice()
  );

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
    this.orderedSeats.update((count) => count < 10 ? count + 1 : 10);
  }
  /// Smanjenje broja rezervisanih mesta
  decreaseReservedSeatsCount() {
    this.orderedSeats.update((count) => (count > 0 ? count - 1 : 0));
  }

  // Removed duplicate constructor

  setProjectionById(id: number) {
    this._projectionService.setSelectedIdProjection(id);
  }
}
