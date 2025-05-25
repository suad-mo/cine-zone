import { Component, inject } from '@angular/core';
import { MovieState } from '../../../infrastructure/state/movie.state';

@Component({
  selector: 'app-my-select-location',
  imports: [],
  templateUrl: './my-select-location.component.html',
  styleUrl: './my-select-location.component.scss'
})
export class MySelectLocationComponent {
  private readonly _state = inject(MovieState);
  listLocation = this._state.listLocation;
  selectedIdLocation = this._state.selectedIdLocation;
  // disabled = this._state.;

}
