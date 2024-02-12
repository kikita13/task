import { Station } from './station';

export interface Search {
  from: Station;
  to: Station;
  date: string;
}
