import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HEADER_ITEMS } from './consts/header-items';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly headerItems = HEADER_ITEMS;
}
