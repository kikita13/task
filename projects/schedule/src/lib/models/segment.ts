import { Detail } from './detail';
import { Station } from './station';
import { Thread } from './thread';
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
  thread?: Thread;
  from?: Station;
  to?: Station;
}
