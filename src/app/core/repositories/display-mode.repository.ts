import { InjectionToken } from "@angular/core";
import { DisplayMode } from "../entities/display-mode.entity";

export abstract class DisplayModeRepository {
  abstract getModes(): Promise<DisplayMode[]>;
}

export const DISPLAY_MODE_REPOSITORY = new InjectionToken<DisplayModeRepository>(
  "DisplayModeRepository"
);
