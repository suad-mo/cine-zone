// presentation/components/day-select.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss'],
  // template: `
  //   <select
  //     [value]="selectedDate ? (selectedDate | date: 'yyyy-MM-dd') : ''"
  //     (change)="onSelect($event)"
  //     [disabled]="disabled"
  //   >
  //     <option value="" disabled>Select Day</option>
  //     @for (day of days; track day) {
  //       <option [value]="day | date: 'yyyy-MM-dd'">
  //         {{ day | date: 'EEE, MMM d' }}
  //       </option>
  //     }
  //   </select>
  // `,
  // styles: [
  //   `
  //     select {
  //       width: 100%;
  //       padding: 0.5rem;
  //       border: 1px solid #ccc;
  //       border-radius: 4px;
  //       font-size: 1rem;
  //     }
  //   `
  // ],
  imports: [DatePipe]
})
export class DaySelectComponent {
  @Input() days: string[] = [];
  @Input() selectedDate: string | null = null;
  @Input() disabled = false;
  @Output() selectedChange = new EventEmitter<string>();

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value.split('T')[0];
    // console.log('Selected date:', value);

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      this.selectedChange.emit(value);
    }
  }
}
