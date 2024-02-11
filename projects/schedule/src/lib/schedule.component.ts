import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ScheduleService } from '../public-api';
import { CommonModule } from '@angular/common';
import { SVG } from './consts/svg';
import { SearchResult } from './models/searchResult';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  private readonly allStations$ = new BehaviorSubject<any>(null);
  readonly routes$ = new BehaviorSubject<Array<any>>([]);
  private readonly scheduleService = inject(ScheduleService);
  readonly svg = SVG;

  form: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    date: new FormControl(''),
  })

  ngOnInit(): void {
    // this.scheduleService.getAllStations().subscribe(data => this.allStations.next(data));
  }

  chooseType(transport: string) {
    this.routes$.pipe(
      map((data: SearchResult[]) =>
        data.map((item) => item.segments.filter((i) => i.details))
      )
    );
  }

  toSearch() {
  }
}
