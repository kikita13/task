import { Routes } from '@angular/router';
import { MapComponent } from '../../projects/map/src/public-api';
import { ScheduleComponent } from '../../projects/schedule/src/public-api';

export const routes: Routes = [
  {
    path: 'map',
    title: 'Карта',
    component: MapComponent,
    pathMatch: 'full'
  },
  {
    path: 'schedule',
    title: 'Расписание',
    component: ScheduleComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
];
