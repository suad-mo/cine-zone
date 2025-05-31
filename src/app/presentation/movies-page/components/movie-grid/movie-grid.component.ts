import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../../../core/entities/movie.entity';
import { Router, RouterModule } from '@angular/router';
// import { Movie } from '../../core/entities/movie.entity';

@Component({
  standalone: true,
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
  imports: [RouterModule],
})
export class MovieGridComponent {
  private router = inject(Router);
  @Input() movies: Movie[] = [];
  @Input() emptyMessage = 'No movies available';

  onClickMovie(id: string) {
    // Pročitaj trenutne query parametre
    const currentParams = {
      ...this.router.routerState.snapshot.root.queryParams,
    };
    delete currentParams['category'];
    this.router.navigate(['/my-movies', id], {
      queryParams: currentParams,
      queryParamsHandling: '',
    });
  }
}
