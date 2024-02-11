import { Segment } from "./segment";
import { Station } from "./station";

export interface SearchResult {
  search: {
    from: Station;
    to: Station;
    date: string;
  };
  segments: Segment[];
  interval_segments: any[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}