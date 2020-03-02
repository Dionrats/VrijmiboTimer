import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { Clock } from './models/clock.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'vrijmibo';
}
