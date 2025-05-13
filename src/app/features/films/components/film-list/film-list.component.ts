import { Component, computed, inject } from '@angular/core';
// import { CinemaService } from '../../../../core/services/cinema.service';
import { Film, Projection } from '../../../../core/models';
import { CardModule } from 'primeng/card';
import { ProjectionService } from '../../../../core/services/projection.service';
import { Router } from '@angular/router';
import { SelectDateComponent } from "../../../../shared/components/select-date/select-date.component";
import { SelectLocationComponent } from "../../../../shared/components/select-location/select-location.component";
import { FilmService } from '../../../../core/services/film.service';


@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CardModule, SelectDateComponent, SelectLocationComponent],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {
  projectionService: ProjectionService = inject(ProjectionService);
  // filmService: FilmService = inject(FilmService);
  router: Router = inject(Router);
  films: Film[] = this.projectionService.getFilms();
  projectionsFilter = this.projectionService.filteredProjectionsByLocationAndDate
  // projectionsFilter = this.projectionService.filteredProjections;

  filmsFilter = computed  (() => {
    const filter = this.projectionsFilter().map((projection: Projection) => {
      const film = this.films.find((film: Film) => film.id === projection.filmId);
      return film ? { ...film, projection } : null;
    }).filter((film: Film | null) => film !== null) as Film[];
    return filter;
  });


  onFilmClick(film: Film) {
    // console.log('Film clicked:', film.id);
    this.projectionService.setSelectedIdFilm(film.id);
    // this.filmService.selectFilmId(film.id);
    this.router.navigate(['/film', film.id]);
  }
}
