import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { SearchResult } from '../models/searchResult';
import { API_URL } from '../consts/api-url';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApiService {
  http = inject(HttpClient);

  private cacheAllStations: any;
  private settlementsAll: any = [];

  private map = new Map();

  getStationsCodes(
    start: string,
    end: string,
    transport_type: string,
    date: string | number
  ) {
    const codes = this.findCodes(start, end, this.map);

    return this.http
      .get(API_URL(
        "search",
        `from=${codes.start}&to=${codes.end}&transport_types=${transport_type}&date=${date}&transfers=true`
      ))
      .pipe(map((data) => data));
  }

  getAllStations(): Observable<any> {
    if (this.cacheAllStations) {
      return of({
        stations: this.cacheAllStations,
        names: [...new Set(this.settlementsAll)],
      });
    } else {
      return this.http.get(API_URL('stations_list', ' ')).pipe(
        map((data: any) => {
          this.cacheAllStations = data;
          this.createStationMap(data);
          console.log(this.settlementsAll);

          return {
            stations: this.cacheAllStations,
            names: [...new Set(this.settlementsAll)],
          };
        })
      );
    }
  }

  private createStationMap(data: any) {
    const countries = data.countries;
    for (const country of countries) {
      const countryTitle = country.title;
      const countryCodes = country.codes;
      const countrySpot = { title: countryTitle, codes: countryCodes };
      this.map.set(countryTitle, countrySpot);

      const regions = country.regions;
      for (const region of regions) {
        const regionTitle = region.title;
        const regionCodes = region.codes;
        const regionSpot = { title: regionTitle, codes: regionCodes };
        this.map.set(regionTitle, regionSpot);

        const settlements = region.settlements;
        for (const settlement of settlements) {
          const settlementTitle = settlement.title;
          const settlementCodes = settlement.codes;

          if (settlementTitle !== '')
            this.settlementsAll.push(settlement.title);

          const settlementSpot = {
            title: settlementTitle,
            codes: settlementCodes,
          };
          this.map.set(settlementTitle, settlementSpot);
        }
      }
    }
  }

  private findCodes(from: string, to: string, map: Map<any, any>) {
    const codeFrom = map.get(from)?.codes.yandex_code;
    const codeTo = map.get(to)?.codes.yandex_code;

    return { start: codeFrom, end: codeTo };
  }
}
