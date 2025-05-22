import { DisplayMode } from "../entities/display-mode.entity";

export abstract class DisplayModeRepository {
  abstract getModes(): Promise<DisplayMode[]>;
}
