import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { FilmService } from '../../core/services/film.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HomeEventsComponent } from './components/home-events/home-events.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [TabViewModule, CarouselModule, CardModule, ScrollPanelModule, HomeEventsComponent]
})
export class HomeComponent {
  readonly films = inject(FilmService).films();
    featuredMovies = [
        // Add your movie data here
        {
            title: 'Film 1',
            image: 'assets/images/movie1.jpg',
            description: 'Opis filma 1'
        },
        // ...more movies
    ];
}
