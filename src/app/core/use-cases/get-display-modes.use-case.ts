import { Injectable } from "@angular/core";
import { DisplayModeRepository } from "../repositories/display-mode.repository";
import { DisplayMode } from "../entities/display-mode.entity";

@Injectable({ providedIn: 'root' })
export class GetModesUseCase {
  constructor(private modeRepository: DisplayModeRepository) {}

  execute(): Promise<DisplayMode[]> {
    return this.modeRepository.getModes();
  }
}
