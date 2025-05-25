// presentation/components/day-select.component.ts
import { Component, Input, Output, EventEmitter, input, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { MovieState } from '../../../../infrastructure/state/movie.state';

@Component({
  standalone: true,
  selector: 'app-day-select',
    imports: [CommonModule, FormsModule, Select],
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss'],
})
export class DaySelectComponent {
  private readonly state = inject(MovieState);
  listDate = this.state.listDate;
  // days = this.state.days;
  selectedDate= this.state.selectedDate;
  disabled = input<boolean>(false);
  @Output() selectedChange = new EventEmitter<string>();

}
