import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { SearchResult } from '../models/searchResult';

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
  ): Observable<SearchResult> {
    return this.http
      .get(`http://localhost:3000/yandex/seachCode/${start}/${end}`)
      .pipe(
        switchMap((codes: any): Observable<SearchResult> => {
          return this.http
            .get<SearchResult>(
              `http://localhost:3000/yandex/search/${codes.start}/${codes.end}/${transport_type}/${date}`
            )
            .pipe(map((data: SearchResult) => data));
        })
      );
  }

  getAllStations() {
    return this.http.get('http://localhost:3000/yandex/stations');
  }

}
