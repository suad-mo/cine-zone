import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from '../../../../core/services/cinema.service';
import { Film, Projection } from '../../../../core/models';
import { CommonModule } from '@angular/common';
import { ProjectionService } from '../../../../core/services/projection.service';
import { CardModule } from 'primeng/card';
import { SelectDateComponent } from '../../../../shared/components/select-date/select-date.component';
import { SelectLocationComponent } from '../../../../shared/components/select-location/select-location.component';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    SelectDateComponent,
    SelectLocationComponent,
  ],
})
export class FilmDetailsComponent implements OnInit {
  private readonly _cinemaService = inject(CinemaService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _projectionService = inject(ProjectionService);

  film = this._projectionService.selectedFilm; //= this._projectionService.selectedFilm;
  projections = this._projectionService.projectionsForSelectedFilm;

  // film: Film | undefined;
  // projections: Projection[] = [];

  ngOnInit(): void {
    // this.film.update(this._projectionService.selectedFilm);
    // Dohvatanje ID-a iz URL-a
    // console.log('URL:', this._route.snapshot.paramMap.get('idFilm'));
    if (!this.film()) {
      console.log('Film nije pronađen......!');

      const idFilm = Number(this._route.snapshot.paramMap.get('idFilm'));
      if (idFilm) {
        this._projectionService.setSelectedIdFilm(idFilm);
      }
    }
    console.log('Film:', this.film());
    console.log('Projekcije:', this.projections());
    // const idFilm = Number(this._route.snapshot.paramMap.get('idFilm'));
    // if (idFilm) {
    //   this.film = this._cinemaService.getFilmById(idFilm);
    //   this.projections = this._projectionService.getProjectionByIdFilm(idFilm);
    // }
  }

  reserveProjection(projectionId: number): void {
    console.log('Rezervacija za projekciju:', projectionId);
    // Dodajte logiku za rezervaciju projekcije
  }
}
