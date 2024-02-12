import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ScheduleService } from '../public-api';
import { CommonModule } from '@angular/common';
import { SVG } from './consts/svg';
import { SearchResult } from './models/searchResult';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiCalendarModule } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'lib-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiCalendarModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  readonly routes$ = new BehaviorSubject<any>([]);
  private readonly scheduleService = inject(ScheduleService);

  readonly svg = SVG;

  showDate = false;
  dateSelected = false;
  selectedDate = 'today';
  transport = ' ';

  form: FormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date: new FormControl(this.getDate(new Date()), Validators.required),
    transport: new FormControl(this.transport, Validators.required),
  });

  ngOnInit(): void {
    this.scheduleService.getAllStations().subscribe()
  }

  chooseType(transport: string) {
    const transportType = this.form.get('transport');
    
    transportType?.setValue(transport);
    
    this.transport = transport;

    if (transport !== ' ') {
      this.routes$.pipe(
        map((data: SearchResult[]) =>
          data.map((item) =>
            item.segments.map((i) => i.transport_types.includes(transport))
          )
        )
      );
    } else {
    }
  }

  toSearch() {
    this.scheduleService
      .getStationsCodes(
        this.form.value.from,
        this.form.value.to,
        this.form.value.transport,
        this.form.value.date
      )
      .subscribe((data) => this.routes$.next(data));

      console.log(this.form.value)
  }

  toSwitch() {
    const fromControl = this.form.get('from');
    const toControl = this.form.get('to');

    if (fromControl && toControl) {
      const tmp = fromControl.value;
      fromControl.setValue(toControl.value);
      toControl.setValue(tmp);
    }
  }

  chooseDate(when: string) {
    this.dateSelected = false;

    const dateControl = this.form.get('date');

    if (when === 'today' && dateControl) {
      this.selectedDate = 'today';

      dateControl.setValue(this.getDate(new Date()));
    } else if (when === 'tomorrow' && dateControl) {
      this.selectedDate = 'tomorrow';

      const tomorrow = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);
      dateControl.setValue(this.getDate(tomorrow));
    } else {
      this.selectedDate = 'date';

      this.showDate = !this.showDate;
    }
  }

  getDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  setDate(date: TuiDay) {
    this.showDate = false;
    this.dateSelected = true;

    const dateControl = this.form.get('date');
    const newDate = new Date(date.year, date.month, date.day + 1);

    if (dateControl) dateControl.setValue(this.getDate(newDate));
  }
}
