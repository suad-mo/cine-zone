import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Movie } from '../../../../core/entities/movie.entity';

@Component({
  selector: 'app-movies-list',
  imports: [RouterModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent {
  private router = inject(Router);
  movies = input<Movie[]>([]);

  onClickMovie(id: string) {
    // Read current query parameters
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
