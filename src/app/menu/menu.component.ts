import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Clock } from '../models/clock.model';
import { DayService } from '../services/day.service';
import { OptionsService } from '../services/options.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  @ViewChild("sidenav", {static: false})
  public sidenav: ElementRef

  public clocks: Clock[] = [
    {name: 'Vrijmibo', target: {weekday: 5, hour: 16, minute: 0, second: 0}, active: true},
    {name: 'Partytime', target: {weekday: this._dayService.getCurrentDayIndex(), hour: 16, minute: 0, second: 0}},
    {name: 'Doner', target: {weekday: 5, hour: 12, minute: 0, second: 0}, specialName: 'DÖNERTIJD'}
  ];

  constructor(private _dayService: DayService, private _optionsService: OptionsService) { }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.sidenav.nativeElement.classList.toggle("active");
  }

  public selectClock(clock: Clock): void {
    this.clocks.forEach(c => c.active = false);
    clock.active = true;
    this._optionsService.currentClock.next(clock);
  }

  public updateGifContext(gifContext: string): void {
    this._optionsService.currentGifContext.next(gifContext);
  }



}
