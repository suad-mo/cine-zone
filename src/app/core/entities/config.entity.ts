import { CinemaLocation } from "./cinema-location.entity";
import { DisplayMode } from "./display-mode.entity";

export interface AppConfig {
  modes: DisplayMode[];
  locations: CinemaLocation[];
}


