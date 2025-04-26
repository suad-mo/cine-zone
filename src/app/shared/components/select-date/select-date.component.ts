import { Component, computed, inject } from '@angular/core';
import { ProjectionService } from '../../../core/services/projection.service';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { bs } from 'date-fns/locale';

@Component({
  selector: 'app-select-date',
  imports: [Select, CommonModule, FormsModule,],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss',
})
export class SelectDateComponent {
  private service = inject(ProjectionService);
  dates = this.service.availableDates;
  selectedDate = this.service.selectedDate;

  formattedDates = computed(() => {
    return this.dates().map((date) => {
      const dateObj = new Date(date);
      const formatted = format(dateObj, 'd MMMM, EEEE', { locale: bs });
      return {
        label: this.capitalize(formatted), // Kapitalizacija
        value: date, // Originalni datum
      };
    });
  });

  formattedSelectedDate = computed(() => {
    const dateObj = new Date(this.selectedDate());
    const formatted = format(dateObj, 'd MMMM, EEEE', { locale: bs });
    return this.capitalize(formatted); // Kapitalizacija
  });

  onChangeDate(event: SelectChangeEvent): void {
    const date: string | null = event.value as string;
    if (!date) return;
    this.service.setSelectedDate(date);
  }

  private capitalize(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
