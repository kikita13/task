import { ScheduleApiService } from './schedule-api.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly scheduleApiService = inject(ScheduleApiService);

  getStationsCodes(
    start: string,
    end: string,
    transport_type: string,
    date: string
  ) {
    return this.scheduleApiService.getStationsCodes(
      start,
      end,
      transport_type,
      date
    );
  }

  getAllStations() {
    return this.scheduleApiService.getAllStations();
  }
}
