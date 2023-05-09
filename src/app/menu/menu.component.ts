import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DayService } from '../services/day.service';
import { OptionsService } from '../services/options.service';
import { Clock } from '../models/clock.model';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  @ViewChild('sidenav', { static: false })
  public sidenav: ElementRef;

  public clocks: Clock[] = [
    { name: 'Vrijmibo', target: { weekday: 5, hour: 16, minute: 30, second: 0 }, active: true },
    { name: 'Partytime', target: { weekday: this.dayService.getCurrentDayIndex(), hour: 16, minute: 30, second: 0 }, active: false },
  ];

  constructor(private dayService: DayService, private optionsService: OptionsService) { }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.sidenav.nativeElement.classList.toggle('active');
  }

  public selectClock(clock: Clock): void {
    this.clocks.forEach(c => c.active = false);
    clock.active = true;
    this.optionsService.currentClock.next(clock);
  }

  public updateGifContext(gifContext: string): void {
    this.optionsService.currentGifContext.next(gifContext);
  }

  public updateTime(time: any) {
    let [hours, mins] = time.split(":");
    let newClock = {
      name: 'customClock',
      active: true,
      target: {
        weekday: this.dayService.getCurrentDayIndex(),
        hour: hours,
        minute: mins,
        second: 0
      }
    }
    this.optionsService.currentClock.next(newClock);
  }

  public resetClock() {
    let clock = this.clocks.find(clock => clock.name === 'Vrijmibo');
    this.optionsService.currentClock.next(clock);
  }

}
