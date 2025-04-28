import {
  Component,
  computed,
  effect,
  Inject,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ProjectionService } from '../../core/services/projection.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Film } from '../../core/models';
import { SeatReservationComponent } from "./components/seat-reservation/seat-reservation.component";
import { ReservationService } from '../../core/services/reservation.service';
import { LocationService } from '../../core/services/location.service';
import { FilmService } from '../../core/services/film.service';

@Component({
  selector: 'app-reservation-page',
  imports: [Breadcrumb, CommonModule, ButtonModule, SeatReservationComponent],
  templateUrl: './reservation.page.html',
  styleUrl: './reservation.page.scss',
  standalone: true,
})
export class ReservationPage implements OnInit {
  private readonly _locationService = inject(LocationService);
  private readonly _filmService = inject(FilmService);
  private readonly _projectionService = inject(ProjectionService);
  private readonly _route = inject(ActivatedRoute); // Inject ActivatedRoute
  private readonly _service = inject(ReservationService);
  proj = this._service.projection
  loc = this._locationService.selectedLocation;

  film = this._projectionService.selectedFilm;
  f = this._filmService.selectedFilm;
  // location = this._projectionService.selectedLocation;
  hall = this._projectionService.selectedHall;
  dateTime = this._projectionService.selectedDate;
  projection = this._projectionService.selectedProjection;
  brojKarata = 0;

  home: MenuItem | undefined;
  level = signal<number>(0); // Corrected property name
  items = computed(() => {
    const its: MenuItem[] = [{ label: 'Home', icon: 'pi pi-fw pi-home' }];
    if (this.level() >= 1) {
      its.push({ label: 'Sjedišta', icon: 'pi pi-fw pi-video' });
    }
    if (this.level() >= 2) {
      its.push({ label: 'Kupovina/Rezervacija', icon: 'pi pi-fw pi-calendar' });
    }
    if (this.level() >= 3) {
      its.push({ label: 'Plati', icon: 'pi pi-fw pi-ticket' });
    }
    return its;
  });

  constructor() {
    // effect(() => {
    //   const film = this.film();
    //   if (film) {
    //     console.log('Film je ažuriran:', film);
    //   } else {
    //     console.warn('Film nije definisan.');
    //   }
    // });
  }
  ngOnInit() {
    // this._locationService.selectLocationId(this.proj()?.locationId ?? undefined);
    // Čitanje parametara rute
    const idProjection = this._route.snapshot.params['idProjection'];
    const idFilm = this._route.snapshot.queryParams['idFilm'];
    const idLocation = this._route.snapshot.queryParams['idLocation'];
    const dateTime = this._route.snapshot.queryParams['dateTime'];
    const idHall = this._route.snapshot.queryParams['idHall'];
    if (!this.f()){
      this._filmService.selectFilmId(Number(idFilm));
      console.log('Film:', this.f());
    }
    if (!this.loc()) {
      this._locationService.selectLocationId(Number(idLocation));
      console.log('Lokacija:', this.loc());
    }
    if (!this.film()) {
      this._projectionService.setSelectedDate(dateTime.toString().split('T')[0]);
      this._projectionService.setSelectedIdFilm(Number(idFilm));
      this._projectionService.setSelectedIdLocation(Number(idLocation));
      this._projectionService.setSelectedIdHall(Number(idHall));
      this._projectionService.setSelectedIdProjection(Number(idProjection));
    }
    // Možete dodati logiku za rad sa ovim parametrima
  }

  onPlus() {
    if (this.brojKarata < 10) {
      this.brojKarata++;
    }
  }

  onMinus() {
    if (this.brojKarata > 0) {
      this.brojKarata--;
    }
  }

  onDalje() {
    // Logika za nastavak rezervacije karata
    this.level.update((prev) => prev + 1);
    console.log('Nastavi rezervaciju sa brojem karata:', this.brojKarata);
  }

  onNazad() {
    // Logika za povratak na prethodni ekran
    this.level.update((prev) => prev > 1 ? prev - 1 : 0);
    console.log('Povratak na prethodni ekran');
  }
}
