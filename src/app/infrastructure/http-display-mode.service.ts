import { Injectable } from '@angular/core';
import { DisplayModeRepository } from '../core/repositories/display-mode.repository';
import { DisplayMode } from '../core/entities/display-mode.entity';
import { delay, firstValueFrom, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpModeService implements DisplayModeRepository {
  constructor() {}

  getModes(): Promise<DisplayMode[]> {
    return firstValueFrom(
      of<DisplayMode[]>([
        { id: 'top', name: 'Top', endUrl: 'top', queryParm: 'dates/list' },
        { id: 'now', name: 'Now', endUrl: '', queryParm: 'dates/list' },
        { id: 'upcoming', name: 'Upcoming', endUrl: 'coming-soon', queryParm: 'months/list' },
      ]).pipe(delay(1000)) // Simulate network delay
    );
  }
}
