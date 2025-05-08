import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { User } from '../models/user.model';
import { Reservation } from '../models/reservation.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _storageKey = 'kinoData';
  // private readonly _userService = inject(UserService);

  // Signali za korisnika i rezervacije
  private _user = signal<User | null>(this.getData().user ?? null);
  private _reservations = signal<Reservation[]>(this.getData().reservations ?? []);

  // // Getter za signale
  // get user(): Signal<User | null> {
  //   return this._user.asReadonly();
  // }

  // Computed signal za korisnika
  user = computed(() => this._user());

  // Computed signal za rezervacije (opciono)
  reservations = computed(() => this._reservations());

  // Computed signal za korisničke rezervacije
  userReservations = computed(() => {
    const userId = this._user()?.id;
    return this.reservations().filter(
      (reservation) => reservation.userId === userId
    );
    // const userId = this._user()?.id;
    // return userId ? this.getUserReservation(userId) : [];
  });

  // get reservations(): Signal<Reservation[]> {
  //   return this._reservations.asReadonly();
  // }

  // === PRIVATE METHODS ===
  private getData(): any {
    const raw = localStorage.getItem(this._storageKey);
    try {
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private setData(data: any): void {
    localStorage.setItem(this._storageKey, JSON.stringify(data));
  }

  // === USER METHODS ===
  saveUser(user: User | null): void {
    const data = this.getData();
    if (!user) {
      delete data.user;
    } else {
      data.user = user;
    }
    this.setData(data);
    this._user.set(user); // Ažuriraj signal
  }

  getUser(): User | null {
    return this._user();
  }

  // === RESERVATION METHODS ===
  saveReservation(newReservation: Reservation): void {
    const data = this.getData();
    const reservations: Reservation[] = data.reservations ?? [];
    const nextId =
      reservations.length > 0
        ? Math.max(...reservations.map((r) => r.id)) + 1
        : 1;
    newReservation.id = nextId;
    reservations.push(newReservation);

    data.reservations = reservations;
    this.setData(data);
    this._reservations.set(reservations); // Ažuriraj signal
  }

  getReservations(): Reservation[] {
    return this._reservations();
  }

  getUserReservation(userId: number): Reservation[] {
    return this._reservations().filter(
      (reservation) => reservation.userId === userId
    );
  }

  deleteReservation(id: number): void {
    const data = this.getData();
    const updatedReservations = (data.reservations ?? []).filter(
      (r: Reservation) => r.id !== id
    );
    data.reservations = updatedReservations;
    this.setData(data);
    this._reservations.set(updatedReservations); // Ažuriraj signal
  }

  // === CLEAR ALL DATA ===
  clearAllData(): void {
    localStorage.removeItem(this._storageKey);
    this._user.set(null); // Resetuj signal korisnika
    this._reservations.set([]); // Resetuj signal rezervacija
  }
}
