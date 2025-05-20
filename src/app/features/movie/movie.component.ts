import { Component, Pipe } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
// import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-movie',
  imports: [ListboxModule, ButtonModule,
    // UpperCasePipe
    ButtonModule,
    AvatarModule,

  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

}
