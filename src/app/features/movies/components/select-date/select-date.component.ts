import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CinemaService } from '../../../../core/services/cinema.service';
import { format } from 'date-fns';
import { bs } from 'date-fns/locale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-date',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss',
})
export class SelectDateComponent {
  private router = inject(Router);
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
        label: this._capitalize(formatted), // Kapitalizacija
        value, // Originalni datum
      };
    });
  });

  constructor() {
    effect(() => {
      const date = this.selectedDate().split('T')[0];
      this.router.navigate([], {
        queryParams: { date },
        queryParamsHandling: 'merge',
      });
    });
  }

  onChangeDate(event: SelectChangeEvent): void {
    const date: string | null = event.value as string;
    if (!date) return;
    this._cinemaService.updateDate(date);
  }

  private _capitalize(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
