import { Component, computed, inject, OnInit } from '@angular/core';
import { PurchaseWizardState } from '../../../infrastructure/states/purchase-wizard.state';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Seat, SeatWithIcon } from '../../../core/entities/seat-plan.entity';
import { ButtonModule } from 'primeng/button';
import { SearchIcon } from 'primeng/icons';
import { se } from 'date-fns/locale';

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
    // console.log('cols called, count:', count, 'array:', array);
    return array;
  }

  seatsView = computed(() => {
    const plan = this.seatsWithIcons();
    if (this.seatPlan()) return [];
    const rowMax = this.seatPlan()?.rowsMax || 0;
    const newPlan: (SeatWithIcon | null)[][] = [];
    for (let i = 0; i < plan.length - 1; i++) {
      const array = Array.from({ length: rowMax }, (_, i) => i);
      const newArray: (SeatWithIcon | null)[] = array.map((index) => {
        const seat = plan[i].find((seat) => seat.columnIndex === index) || null;
        return seat;
      });
      newPlan[i].push(...newArray);
    }
    return newPlan;
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
