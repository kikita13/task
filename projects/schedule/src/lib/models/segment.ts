import { Detail } from './detail';
import { Station } from './station';
import { Transfer } from './transfer';

export interface Segment {
  departure_from: Station;
  arrival_to: Station;
  transport_types: string[];
  departure: string;
  arrival: string;
  transfers?: Transfer[];
  has_transfers: boolean;
  details?: Detail[];
}
