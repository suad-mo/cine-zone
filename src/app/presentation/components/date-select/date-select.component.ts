import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { bs, se } from 'date-fns/locale';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-date-select',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './date-select.component.html',
  styleUrl: './date-select.component.scss',
})
export class DateSelectComponent {
  @Output() selectedChange = new EventEmitter<string>();
  dates = input(<string[]>[]);
  selectDate = input<string | null>(null);
  listDates = computed(() => {
    return this.dates().map((date) => {
      let formattedDate = '';
      const dateObj = new Date(date);
      const now = new Date();
      const isToday = dateObj.toDateString() === now.toDateString();
      const isTomorrow =
        new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
        dateObj.toDateString();
      if (isToday) {
        formattedDate = 'Danas';
      } else if (isTomorrow) {
        formattedDate = format(dateObj, 'd MMMM', { locale: bs }) + ', Sutra';
      } else {
        formattedDate = format(dateObj, 'd MMMM, EEEE', { locale: bs });
      }
      const label = this._capitalize(formattedDate);
      const value = date;
      return {
        label,
        value,
      };
    });
  });


  private _capitalize(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
