import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../projects/header/src/public-api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, HeaderComponent, TuiRootModule, TuiDialogModule, TuiAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
})
export class AppComponent {}
