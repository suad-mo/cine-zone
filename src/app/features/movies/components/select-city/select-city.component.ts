import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CinemaService } from '../../../../core/services/cineplexx/cinema.service';

@Component({
  selector: 'app-select-city',
  imports: [Select, FormsModule],
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.scss',
})
export class SelectCityComponent {
  private router = inject(Router);
  private readonly _cinemaService = inject(CinemaService);
  private readonly _cities = this._cinemaService.listLoc;

  queryParams = this._cinemaService.queryParams;

  listLocation = computed(() => {
    const list = [
      {
        label: 'Svi gradovi',
        value: 'all',
      },
    ];
    const x = this._cities().map((city) => {
      return {
        label: city.name,
        value: city.id,
      };
    });
    return [...list, ...x];
  });

  selectedLocation = this._cinemaService.location;

  constructor() {}

  onChangeLocation(event: SelectChangeEvent): void {
    this.router.navigate([], {
      queryParams: this.queryParams(),
      queryParamsHandling: 'replace',
      replaceUrl: true,
    });
  }
}
