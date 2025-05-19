import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { CinemaService } from '../../../../core/services/cinema.service';

@Component({
  selector: 'app-select-month',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './select-month.component.html',
  styleUrl: './select-month.component.scss',
})
export class SelectMonthComponent {
  private readonly _cinemaService = inject(CinemaService);
  readonly listMonth = this._cinemaService.listMonth;
  selectedMonth = this._cinemaService.month;

  formattedMonths = computed(() => {
    return this.listMonth().map((date) => {
      let formatted = '';
      const dateObj = new Date(date);
      const now = new Date();
      const value = date.split('T')[0];
      const isCurrentMonth =
        dateObj.getMonth() === now.getMonth() &&
        dateObj.getFullYear() === now.getFullYear();
      const month = dateObj.toLocaleString('default', { month: 'long' });
      const year = dateObj.getFullYear();
      formatted = isCurrentMonth ? 'Trenutni mjesec' : month;

      return {
        label: formatted, // Formatiranje mjeseca i godine
        value: date, // Originalni datum
      };
    });
  });

  constructor() {
    effect(() => {
      const month = this.selectedMonth().split('T')[0];
      // this._cinemaService.updateMonth(month);
    });
  }
}
