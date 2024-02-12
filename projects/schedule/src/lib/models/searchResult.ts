import { Search } from './search';
import { Segment } from './segment';
import { Station } from './station';

export interface SearchResult {
  search: Search;
  segments: Segment[];
  interval_segments: any[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}
