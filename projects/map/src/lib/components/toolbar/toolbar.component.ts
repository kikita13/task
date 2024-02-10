import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-toolbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  height = 0;

  @Output() drawPolygon = new EventEmitter<void>();
  @Output() deletePolygon = new EventEmitter<void>();
  @Output() choosePolygon = new EventEmitter<void>();
  @Output() editPolygon = new EventEmitter<void>();
  @Output() deleteAllPolygon = new EventEmitter<void>();
  @Output() heightCount = new EventEmitter<number>();

  onDrawPolygon() {
    this.drawPolygon.emit();
  }

  onDeletePolygon() {
    this.deletePolygon.emit();
  }

  onChoosePolygon() {
    this.choosePolygon.emit();
  }

  onEditPolygon() {
    this.editPolygon.emit();
  }

  onDeleteAllPolygon() {
    this.deleteAllPolygon.emit();
  }

  onHeightCount (height: number) {
    this.heightCount.emit(height);
  }
}
