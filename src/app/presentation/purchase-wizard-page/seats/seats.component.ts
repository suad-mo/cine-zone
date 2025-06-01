import { Component, inject, OnInit } from '@angular/core';
import { PurchaseWizardState } from '../../../infrastructure/states/purchase-wizard.state';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seats',
  imports: [CommonModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.scss',
})
export class SeatsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private _state = inject(PurchaseWizardState);

  area = this._state.area;
  seatPlan = this._state.seatPlan;

  async ngOnInit(): Promise<void> {
    const id = this.route.parent?.snapshot.paramMap.get('id') || undefined;
    console.log('SeatsComponent ngOnInit called with id:', id);

    await this._state.setAreaAndSeatPlan(id);
  }
}
