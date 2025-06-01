import { Component, computed, inject, input } from '@angular/core';
import { DateSessions } from '../../../../core/entities/session.entity';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesions',
  imports: [CommonModule],
  templateUrl: './sesions.component.html',
  styleUrl: './sesions.component.scss',
})
export class SesionsComponent {
  private readonly _ruter = inject(Router)
  readonly dateSesions = input<DateSessions[]>([]);
  // readonly sessions = this.dateSesions()[0]?.sessions || [];
  readonly sessions = computed(() => {
    return this.dateSesions()[0]?.sessions;
  });

  openTiskets(id: string) {
    console.log('Open tickets for session:', this.sessions());
    this._ruter.navigate(['purchase/wizard', id], {

      queryParams: {}
    });
  }
}
