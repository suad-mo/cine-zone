import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge'; // Replace with the correct library path for BadgeModule
import { StorageService } from '../../../core/services/storage.service';
import { UserService } from '../../../core/services/user.service';
import { Seat } from '../../../core/models';
import { CardModule } from 'primeng/card';

@Component({
  imports: [CommonModule, BadgeModule, CardModule],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss',
})
export class MyReservationsComponent {
  private readonly _storageService = inject(StorageService);
  private readonly _userService = inject(UserService); // Uncomment if needed
  private readonly user = this._storageService.user; // Assuming this returns the current user directly
  reservations = this._storageService.userReservations; // Assuming this returns the user's reservations directly

  constructor() {
    // console.log('MyReservationsComponent initialized');
    // console.log('User:', this.user());
    // console.log('Reservations:', this.reservations()); // Log the reservations to check if they are loaded correctly
  }

  formatedSeats(seats: Seat[]): string {
    return seats.map((seat) => `R${seat.row + 1}/K${seat.column + 1}`).join(', ');
  }

}
