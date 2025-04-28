import { computed, Injectable, signal } from '@angular/core';
import { MOSK_HALLS } from '../mock/mock_halls';
import { Hall } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  halls = signal<Hall[]>(MOSK_HALLS);
  selectedHallId = signal<number | null>(null);
  selectedHall = computed(() => {
    const id = this.selectedHallId();
    if (id === null) {
      return undefined;
    }
    const hall = this.halls().find((h) => h.id === id) || undefined;
    return hall;
  });

  selectHallId(id: number | null) {
    this.selectedHallId.set(id);
  }


  constructor() { }
}
