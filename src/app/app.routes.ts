import { Routes } from '@angular/router';
import { MapComponent } from '../../projects/map/src/public-api';
import { ScheduleComponent } from '../../projects/schedule/src/public-api';

export const routes: Routes = [
  {
    path: 'map',
    title: 'Карта',
    component: MapComponent,
  },
  {
    path: 'schedule',
    title: 'Расписание',
    component: ScheduleComponent,
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
  },
];
