import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectionsComponent } from './features/projections/components/projections/projections.component';

@Component({
  selector: 'app-root',
  imports: [ProjectionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // standalone: true,
})
export class AppComponent {
  title = 'Cine Zone';
}
