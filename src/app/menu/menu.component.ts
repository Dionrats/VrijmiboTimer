import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clock } from '../models/clock.model';
import { DayService } from '../services/day.service';
import { OptionsService } from '../services/options.service';
import { GifChoice } from '../models/gif-choice';
import { GifChoiceConstant } from '../models/gif-choice-constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {

  @ViewChild('sidenav', { static: false })
  public sidenav: ElementRef;

  public customClock: Clock;

  public clocks: Clock[] = [
    { name: 'Vrijmibo', target: { weekday: 5, hour: 16, minute: 30, second: 0 }, active: true },
    { name: 'Partytime', target: { weekday: this.dayService.getCurrentDayIndex(), hour: 16, minute: 30, second: 0 }, active: false },
  ];

  public gifChoices: GifChoice[] = [
    { name: GifChoiceConstant.Personal, active: false },
    { name: GifChoiceConstant.Giphy, active: true}
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
    console.log(clock)
    this.optionsService.currentClock.next(clock);
  }

  public updateGifContext(gifContext: string): void {
    this.optionsService.currentGifContext.next(gifContext);
  }

  public updateTime(time: any) {
    this.clocks.forEach(c => c.active = false);
    let [hours, mins] = time.split(":");
    this.customClock = { name: 'customClock', target: { weekday: this.dayService.getCurrentDayIndex(), hour: hours, minute: mins, second: 0 }, active: true };
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

    this.optionsService.currentClock.next(this.customClock);
  }

  public resetClock() {
    let clock = this.clocks.find(clock => clock.name === 'Vrijmibo');
    this.optionsService.currentClock.next(clock);
  }

  public selectGifChoice(gifChoice: GifChoice) {
    this.gifChoices.forEach(g => g.active = false);
    gifChoice.active = true;
    this.optionsService.currentGifChoice.next(gifChoice.name);
  }

}
