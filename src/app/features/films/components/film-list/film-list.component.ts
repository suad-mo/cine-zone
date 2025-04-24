import { Component, inject } from '@angular/core';
import { CinemaService } from '../../../../core/services/cinema.service';
import { Film } from '../../../../core/models';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CardModule],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {
  films: Film[] = inject(CinemaService).getFilms();

  onFilmClick(film: Film) {
    // Implementacija klika
    console.log('Film clicked:', film);
  }
}
