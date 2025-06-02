import { computed, Injectable, signal } from '@angular/core';
import { ScheduledMovieSession } from '../../core/entities/sheduled-movie-session';
import { GetSheduledMovieSessionsUseCase } from '../../core/use-cases/get-sheduled-movie-session.use-case';
import { Area } from '../../core/entities/area.entity';
import { SeatPlan, SeatWithIcon } from '../../core/entities/seat-plan.entity';
import { GetAreaUseCase } from '../../core/use-cases/get-area.use-case';
import { GetSeatPlanUseCase } from '../../core/use-cases/get-seat-plan.use-case';

@Injectable({
  providedIn: 'root',
})
export class PurchaseWizardState {
  private _id = signal<string>('');
  readonly id = this._id.asReadonly();
  readonly cinemaId = computed(() => this._id().split('-')[0] || '');
  readonly sessionId = computed(() => this._id().split('-')[1] || '');
  private _sheduledMovieSession = signal<ScheduledMovieSession | null>(null);
  private _area = signal<Area[]>([]);

  private _seatPlan = signal<SeatPlan | null>(null);

  seatPlanWithIcons = computed(() => {
    const seatPlan = this._seatPlan();
    if (!seatPlan) {
      return [];
    }
    const icons = seatPlan.icons;
    const seats = seatPlan.rows.map((row) => {
      return row.seats.map((seat) => {
        const icon = icons.find((icon) => icon.id === seat.seatIconId);
        return <SeatWithIcon>{
          ...seat,
          icon: icon ? icon.imageUrl : null,
        };
      });
    });
    return seats;
  });

  readonly sheduledMovieSession = this._sheduledMovieSession.asReadonly();
  readonly area = this._area.asReadonly();
  readonly seatPlan = this._seatPlan.asReadonly();

  constructor(
    private getSheduledMovieSessionsUseCase: GetSheduledMovieSessionsUseCase,
    private getAreaUseCase: GetAreaUseCase,
    private getSeatPlanUseCase: GetSeatPlanUseCase
  ) {}

  async setSheduledMovieSession(id?: string): Promise<void> {
    try {
      if (!id) {
        console.warn('No movie session ID provided');
        return;
      }
      const scheduledSession =
        await this.getSheduledMovieSessionsUseCase.execute(id);
      this._sheduledMovieSession.set(scheduledSession);
      this._id.set(id);
    } catch (error) {
      console.log('Error fetching scheduled movie session:', error);
    }
  }

  async setAreaAndSeatPlan(id?: string): Promise<void> {
    if (!id) {
      console.warn('No movie session ID provided');
      return;
    }
    this._id.set(id);
    try {
      const area = await this.getAreaUseCase.execute(
        this.cinemaId(),
        this.sessionId()
      );
      this._area.set(area);

      const seatPlan = await this.getSeatPlanUseCase.execute(
        this.cinemaId(),
        this.sessionId()
      );
      this._seatPlan.set(seatPlan);
    } catch (error) {
      console.error('Error fetching area and seat plan:', error);
    } finally {
      console.log('Area and seat plan fetched successfully');
    }
  }
}
