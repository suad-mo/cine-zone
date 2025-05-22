import { Injectable } from '@angular/core';
import { AppConfig } from '../entities/config.entity';
import { ConfigRepository } from '../repositories/config.repository';
@Injectable({
  providedIn: 'root',
})
export class GetInitialConfigUseCase {
  constructor(private configRepository: ConfigRepository) {}
  execute(): Promise<AppConfig> {
    return this.configRepository.getInitialConfig();
  }

}
