// presentation/components/movie-grid.component.ts
import { Component, Input } from '@angular/core';
import { Movie } from '../../../../core/entities/movie.entity';
// import { Movie } from '../../core/entities/movie.entity';

@Component({
  standalone: true,
  selector: 'app-movie-grid',
  template: `
    <div class="grid">
      @for (movie of movies; track movie.id) {
        <div class="movie-card">
          <img [src]="movie.posterImage" [alt]="movie.title">
          <h3>{{ movie.title }}</h3>
          <div class="screening-times">
            @for (time of movie.genres; track time) {
              <span class="time-badge">{{ time }}</span>
            }
          </div>
        </div>
      }
      @empty {
        <div class="empty-message">{{ emptyMessage }}</div>
      }
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
      }

      .movie-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        padding: 1rem;
      }

      .empty-message {
        text-align: center;
        padding: 2rem;
        color: #666;
      }

      .screening-times {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .time-badge {
        background: #f0f0f0;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
      }
    `
  ]
})
export class MovieGridComponent {
  @Input() movies: Movie[] = [];
  @Input() emptyMessage = 'No movies available';
}
