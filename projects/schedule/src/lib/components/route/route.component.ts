import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Segment } from '../../models/segment';
import { Search } from '../../models/search';

@Component({
  selector: 'lib-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteComponent {
  @Input() segment!: Segment;
  @Input() search!: Search | null;

  calculateDuration(departure: string, arrival: string): string {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);
    const durationInMillis = arrivalDate.getTime() - departureDate.getTime();
    const hours = Math.floor(durationInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInMillis % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours} ч ${minutes} мин`;
  }

  localeTime(dateString: string) {
    const splited = dateString.split('T')[1].split('+')[0].split(':');

    return `${splited[0]}:${splited[1]}`
  }
}
