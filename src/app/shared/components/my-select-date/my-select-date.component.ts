import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaService } from '../../../core/services/cinema.service';
import { Select, SelectChangeEvent } from 'primeng/select';
import { format } from 'date-fns';
import { bs } from 'date-fns/locale';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-select-date',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './my-select-date.component.html',
  styleUrl: './my-select-date.component.scss',
})
export class MySelectDateComponent {
  private readonly _cinemaService = inject(CinemaService);
  readonly listDate = this._cinemaService.listDate;

  selectedDate = this._cinemaService.date;

  formattedDates = computed(() => {
    return this.listDate().map((date) => {
      let formatted = '';
      const dateObj = new Date(date);
      const now = new Date();
      const value = date.split('T')[0];
      const isToday = dateObj.toDateString() === now.toDateString();
      const isTomorrow =
        new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
        dateObj.toDateString();
      if (isToday) {
        formatted = 'Danas';
      } else if (isTomorrow) {
        formatted = format(dateObj, 'd MMMM', { locale: bs }) + ', Sutra';
      } else {
        formatted = format(dateObj, 'd MMMM, EEEE', { locale: bs });
      }
      return {
        label: this.capitalize(formatted), // Kapitalizacija
        value, // Originalni datum
      };
    });
  });

  onChangeDate(event: SelectChangeEvent): void {
    const date: string | null = event.value as string;
    if (!date) return;
    this._cinemaService.updateDate(date);
  }

  private capitalize(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
