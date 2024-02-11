import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApiService {
  http = inject(HttpClient);

  getStationsCodes(
    start: string,
    end: string,
    transport_type: string,
    date: string | number
  ) {
    return this.http
      .get(`http://localhost:3000/yandex/stations/${start}/${end}`)
      .pipe(
        switchMap((codes: any) => {
          return this.http
            .get(
              `http://localhost:3000/yandex/search/${codes.start}/${codes.end}/${transport_type}/${date}`
            )
            .pipe(map((data) => console.log(data)));
        })
      );
  }

  getAllStations() {
    return this.http.get('http://localhost:3000/yandex/stations');
  }
}
