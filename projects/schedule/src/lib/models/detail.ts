import { Station } from "./station";
import { Thread } from "./thread";

export interface Detail {
  thread: Thread;
  stops: string;
  from: Station;
  to: Station;
  departure_platform: string;
  arrival_platform: string;
  departure_terminal: string | null;
  arrival_terminal: string | null;
  duration: number;
  departure: string;
  arrival: string;
  start_date: string;
}