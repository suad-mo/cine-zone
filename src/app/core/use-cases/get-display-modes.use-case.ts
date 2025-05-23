import { Inject, Injectable } from '@angular/core';
import {
  DISPLAY_MODE_REPOSITORY,
  DisplayModeRepository,
} from '../repositories/display-mode.repository';
import { DisplayMode } from '../entities/display-mode.entity';

@Injectable({ providedIn: 'root' })
export class GetModesUseCase {
  constructor(
    @Inject(DISPLAY_MODE_REPOSITORY)
    private modeRepository: DisplayModeRepository
  ) {}

  execute(): Promise<DisplayMode[]> {
    return this.modeRepository.getModes();
  }
}
