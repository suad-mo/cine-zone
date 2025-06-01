import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PurchaseWizardState } from '../../infrastructure/states/purchase-wizard.state';

@Component({
  selector: 'app-purchase-wizard-page',
  imports: [RouterOutlet],
  templateUrl: './purchase-wizard-page.component.html',
  styleUrl: './purchase-wizard-page.component.scss',
  providers: [PurchaseWizardState],
  standalone: true,
})
export class PurchaseWizardPageComponent implements OnInit {
  private _state = inject(PurchaseWizardState);
  private route = inject(ActivatedRoute);

  sheduledMovieSession = this._state.sheduledMovieSession;


  async ngOnInit() {
    const paramMap = this.route.snapshot.paramMap;
    const id = paramMap.get('id') || undefined;
    this._state.setSheduledMovieSession(id)
  }
}
