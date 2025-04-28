import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Film, Hall, Location, Projection, Seat } from '../models';
import { ProjectionService } from './projection.service';
import { se } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly _projectionService = inject(ProjectionService);

  // Privatni lokalni signal za projekciju
  private readonly _projection = signal<Projection | undefined>(this._projectionService.selectedProjection());
  // Ostali getter-i: koriste servis
  readonly film = this._projectionService.selectedFilm;
  readonly hall = this._projectionService.selectedHall;
  readonly dateTime = this._projectionService.selectedDate;
  readonly location = this._projectionService.selectedLocation;

  // Getter za trenutnu projekciju
  // readonly projection = computed(() => this._projection());
  readonly projection = computed(() => this._projectionService.selectedProjection());
  // Svi redovi i sjedala
  readonly seatsAll = computed(() => this._projection()?.seatMap);

  // Cijena jednog mjesta
  readonly seatPrice = computed(() => this._projection()?.price ?? 0);

  // Sva odabrana sjedala
  readonly seatsSelected = computed(() =>
    this.seatsAll()?.flatMap(row => row.filter(seat => seat.status === 'selected')) ?? []
  );

  // Broj odabranih sjedala
  readonly selectedSeatsCount = computed(() => this.seatsSelected().length);

  // Ukupna cijena odabranih sjedala
  readonly selectedSeatsPrice = computed(() => this.selectedSeatsCount() * this.seatPrice());

  constructor() {
    effect(() => {
      this._projection.set(this._projectionService.selectedProjection());
    });

  }

  private readonly _selectedSeatsCount = signal<number>(0);

  seatsMap = computed(() => {
    return this._projection()?.seatMap;
  });


  // Funkcija za promjenu statusa sjedala
  changeSeatStatus(seat: Seat) {
    this._projection.update((projection) => {
      if (!projection) return projection;
      projection.seatMap[seat.row][seat.column].status =seat.status;
      return projection;
    });
  }


  /// Povećanje broja rezervisanih mesta
  increaseReservedSeatsCount() {
    this._selectedSeatsCount.update((count) => count + 1);
  }
  /// Smanjenje broja rezervisanih mesta
  decreaseReservedSeatsCount() {
    this._selectedSeatsCount.update((count) => (count > 0 ? count - 1 : 0));
  }

  // Removed duplicate constructor

  setProjectionById(id: number) {
    this._projectionService.setSelectedIdProjection(id);
  }
}
