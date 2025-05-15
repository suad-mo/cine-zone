import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-home-test',
  imports: [CommonModule],
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.scss',
})
export class HomeTestComponent {
  readonly listIcon = computed(() => [
    'https://app.cineplexx.ba/static/area_categories/free.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied-double.svg',
  ]);

  readonly list: string[] = [
    'https://app.cineplexx.ba/static/area_categories/free.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied.svg',
    'https://app.cineplexx.ba/static/area_categories/occupied-double.svg',
  ];
}
