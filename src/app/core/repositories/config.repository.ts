import { AppConfig } from "../entities/config.entity";

export abstract class ConfigRepository {
  abstract getInitialConfig(): Promise<AppConfig>;
}
