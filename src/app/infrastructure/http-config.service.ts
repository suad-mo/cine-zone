import { Injectable } from '@angular/core';
import { ConfigRepository } from '../core/repositories/config.repository';
import { AppConfig } from '../core/entities/config.entity';
import { DisplayMode } from "../core/entities/display-mode.entity";
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService implements ConfigRepository {
  private readonly configUrl = 'assets/config.json';
  private readonly modes: DisplayMode[] = [
    {
      id: 'top',
      name: 'Top',
    },
    {
      id: 'now',
      name: 'Now',
    },
    {
      id: 'upcoming',
      name: 'Upcoming',
    },
  ];
  constructor(private http: HttpClient) {
    this.getInitialConfig();
  }
  getInitialConfig(): Promise<AppConfig> {
    return lastValueFrom(this.http.get<AppConfig>(this.configUrl));
  }
}
