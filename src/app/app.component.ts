import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { MenuComponent } from "./menu/menu.component";
import { ClockComponent } from "./clock/clock.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    imports: [CommonModule, BackgroundComponent, MenuComponent, ClockComponent]
})
export class AppComponent {
  title = 'VrijmiboTimer';
}
