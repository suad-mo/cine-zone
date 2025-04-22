import { Component, inject } from '@angular/core';
import { CinemaService } from '../../../../core/services/cinema.service';
import { Film } from '../../../../core/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-list',
  imports: [CommonModule],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss',
})
export class FilmListComponent {
  films: Film[] = inject(CinemaService).getFilms(); // Assuming FilmService is provided in the module or component

  onFilmClick(_t3: any) {
    throw new Error('Method not implemented.');
  }
}
