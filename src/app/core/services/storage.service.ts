import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _storageKey = 'kinoData';

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

  // User data methods
  saveUser(user: User | null): void {
    const data = this.getData();
    if (!user) {
      delete data.user;
    } else {
      data.user = user;
    }
    this.setData(data);
  }

  getUser(): User | null {
    return this.getData().user ?? null;
  }

  // === RESERVATIONS DATA ===
  saveReservation(newReservation: Reservation): void {
    const data = this.getData();
    const reservations: Reservation[] = data.reservations ?? [];
    // Add new reservation with unique ID
    const nextId =
      reservations.length > 0
        ? Math.max(...reservations.map((r) => r.id)) + 1
        : 1;
    newReservation.id = nextId;
    reservations.push(newReservation);

    data.reservations = reservations;
    this.setData(data);
  }

  getReservations(): Reservation[] {
    return this.getData().reservations ?? [];
  }

  getUserReservation(userId: string): Reservation[] {
    return this.getReservations().filter(
      (reservation) => reservation.userId === userId
    );
  }

  deleteReservation(id: number): void {
    const data = this.getData();
    data.reservations = (data.reservations ?? []).filter(
      (r: Reservation) => r.id !== id
    );
    this.setData(data);
  }

  // === CLEAR ALL DATA ===
  clearAllData(): void {
    localStorage.removeItem(this._storageKey);
  }
}
