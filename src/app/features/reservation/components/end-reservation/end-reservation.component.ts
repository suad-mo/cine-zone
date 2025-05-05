import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-end-reservation',
  templateUrl: './end-reservation.component.html',
  standalone: true,
  imports: [CardModule]
})
export class EndReservationComponent implements OnInit, OnDestroy {
  countdown = 3;
  private timerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.timerSubscription = interval(1000)
      .pipe(take(3))
      .subscribe({
        next: () => {
          this.countdown--;
        },
        complete: () => {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
