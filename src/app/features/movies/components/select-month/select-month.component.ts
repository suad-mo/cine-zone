import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CinemaService } from '../../../../core/services/cinema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-month',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './select-month.component.html',
  styleUrl: './select-month.component.scss',
})
export class SelectMonthComponent {
  private router = inject(Router);
  private readonly _cinemaService = inject(CinemaService);
  readonly listMonth = this._cinemaService.listMonth;
  selectedMonth = this._cinemaService.month;
  queryParams = this._cinemaService.queryParams;
  formattedMonths = computed(() => {
    const allMonth = this.listMonth().map((date) => {
      let formatted = '';
      if (date === 'all') {
        return { label: 'All months', value: 'all' };
      }
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
        value, // Originalni datum
      };
    });

    return allMonth;
  });

  constructor() {
    effect(() => {
      console.log('Selected month:', this.selectedMonth());

      // const month = this.selectedMonth().split('T')[0];
      // this.router.navigate([], {
      //   queryParams: { date: month },
      //   queryParamsHandling: 'merge',
      // });
    });
  }
  onChangeMonth(event: SelectChangeEvent): void {
    this.router.navigate([], {
      queryParams: this.queryParams(),
      queryParamsHandling: 'replace',
      replaceUrl: true,
    });
  }
}
