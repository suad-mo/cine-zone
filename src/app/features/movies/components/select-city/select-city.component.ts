import { Component, computed, effect, inject } from '@angular/core';
import { CinemaService } from '../../../../core/services/cinema.service';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { City } from '../../../../core/models/cineplexx/city';
import { Router } from '@angular/router';

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

  // get selectedLocation() {
  //   return this._cinemaService.loc() ?? undefined;
  // }

  // set selectedLocation(location: string | undefined) {
  //   this._cinemaService.loc.set(location ? location : 'all');
  // }

  constructor() {
    effect(() => {
      const location = this.selectedLocation();
      this.router.navigate([], {
            queryParams: { location },
            queryParamsHandling: 'merge',
          });
    });
  }
  onChangeLocation(event: SelectChangeEvent): void {
    const selectedLoc = event.value as string;
    console.log('Selected location:', selectedLoc);

    // if (!selectedLoc) return;
    this._cinemaService.updateLocation(selectedLoc);
  }
}
