import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  map,
  takeUntil,
} from 'rxjs';
import { ScheduleService } from '../public-api';
import { CommonModule } from '@angular/common';
import { SVG } from './consts/svg';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiCalendarModule } from '@taiga-ui/core';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { SearchResult } from './models/searchResult';
import { Segment } from './models/segment';
import { RouteComponent } from './components/route/route.component';
import { Search } from './models/search';

@Component({
  selector: 'lib-schedule',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiCalendarModule,
    RouteComponent,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ScheduleComponent implements OnInit {
  readonly segments$ = new BehaviorSubject<Segment[] | null>([]);
  readonly search$ = new BehaviorSubject<Search | null>(null);
  readonly names$ = new BehaviorSubject<string[]>([]);
  readonly completeNamesFrom$ = new BehaviorSubject<string[]>([]);
  readonly completeNamesTo$ = new BehaviorSubject<string[]>([]);
  private readonly scheduleService = inject(ScheduleService);
  private readonly destroy = inject(TuiDestroyService);

  readonly svg = SVG;

  showDate = false;
  dateSelected = false;
  fromSelected = false;
  toSelected = false;
  selectedDate = 'today';
  transport = ' ';

  form: FormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date: new FormControl(this.getDate(new Date()), Validators.required),
    transport: new FormControl(this.transport, Validators.required),
  });

  ngOnInit(): void {
    this.scheduleService
      .getAllStations()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: any) => this.names$.next(data.names));
  }

  chooseType(transport: string) {
    const transportType = this.form.get('transport');

    transportType?.setValue(transport);

    this.transport = transport;

    this.toSearch();
  }

  toSearch() {
    this.scheduleService
      .getStationsCodes(
        this.form.value.from,
        this.form.value.to,
        this.form.value.transport,
        this.form.value.date
      )
      .subscribe((data: SearchResult) => {
        this.segments$.next(data.segments);
        this.search$.next(data.search);
      });
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

    this.toSearch();
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
    this.toSearch();
  }

  autoComplete(str: string, names: string[], inputType: string) {
    if (str.length < 3) {
      return;
    } else {
      const filteredNames = names.filter((item) =>
        item.toLowerCase().includes(str.toLowerCase())
      );
      if (inputType === 'from') {
        this.fromSelected = false;
        this.completeNamesFrom$.next(filteredNames);
      } else if (inputType === 'to') {
        this.toSelected = false;
        this.completeNamesTo$.next(filteredNames);
      }
    }
  }

  onChooseName(form: any, formName: string, name: string) {
    if (form) form.setValue(name);

    if (formName === 'from') {
      this.fromSelected = true;
    } else if (formName === 'to') {
      this.toSelected = true;
    }
  }
}
