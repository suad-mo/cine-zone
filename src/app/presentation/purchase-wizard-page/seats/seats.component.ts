import { Component, computed, inject, OnInit } from '@angular/core';
import { PurchaseWizardState } from '../../../infrastructure/states/purchase-wizard.state';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Seat, SeatWithIcon } from '../../../core/entities/seat-plan.entity';
import { ButtonModule } from 'primeng/button';
import { SearchIcon } from 'primeng/icons';

@Component({
  selector: 'app-seats',
  imports: [CommonModule, ButtonModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss',
})
export class SeatsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private _state = inject(PurchaseWizardState);

  area = this._state.area;
  seatPlan = this._state.seatPlan;
  seatsWithIcons = this._state.seatPlanWithIcons;
  x = this.seatPlan()?.rowsMax || 0;

  get cols() {
    const count = this.seatPlan()?.rowsMax || 0;
    const array = Array.from({ length: count }, (_, i) => i);
    console.log('cols called, count:', count, 'array:', array);
    return array;
  }

  seatsView = computed(() => {
    const seatPlan = this.seatPlan();
    if (!seatPlan) return [];
    const rowMax  = seatPlan.rowsMax;
    // const newRows =
    // for (let i = 0; i < seatPlan.rows.length; i++) {
    //   if (!seatPlan.rows[i]) {
    //     seatPlan.rows[i] = [];
    //   }
    // }
    const array = Array.from({ length: rowMax }, (_, i) => i);
    return array.map((index) => {
      return {
        index,
        seats: seatPlan.rows[index] || [],
      };
    });

  });

  async ngOnInit(): Promise<void> {
    const id = this.route.parent?.snapshot.paramMap.get('id') || undefined;
    console.log('SeatsComponent ngOnInit called with id:', id);

    await this._state.setAreaAndSeatPlan(id);
  }

  toggleSeat(seat: Seat) {
    console.log('toggleSeat called with seat:', seat);

    // if (this.ordreredSeats()===this.countSeats() && seat.status === 'available') return;
    // if (seat.status === 'reserved') {
    //   return;
    // }
    // // seat.status = seat.status === 'selected' ? 'available' : 'selected';
    // this._reservationService.changeSeatStatus(seat);
  }

  findSeatByColumnIndex(row: SeatWithIcon[], index: number): any {
    if (!row || !row[index]) return null;
    return row.find((seat: SeatWithIcon) => seat.columnIndex === index);
  }
}
