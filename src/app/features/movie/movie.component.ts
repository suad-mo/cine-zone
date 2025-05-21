import { Component } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { HorizontalImageSliderComponent } from './horizontal-image-slider/horizontal-image-slider.component';
import { ImageModule } from 'primeng/image';
// import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-movie',
  imports: [
    HorizontalImageSliderComponent,
    ListboxModule,
    ButtonModule,
    ButtonModule,
    AvatarModule,
    ImageModule,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {}
