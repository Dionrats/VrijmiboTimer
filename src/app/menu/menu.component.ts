import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class MenuComponent implements AfterViewInit {

  @ViewChild('sidenav', { static: false })
  public sidenav: ElementRef;

  @ViewChild('hour')
  public hourInput: ElementRef;

  @ViewChild('minute')
  public minuteInput: ElementRef;

  public clocks: Clock[] = [
    { name: 'Vrijmibo', target: { weekday: 5, hour: 16, minute: 30, second: 0 }, active: true },
    { name: 'Partytime', target: { weekday: this.dayService.getCurrentDayIndex(), hour: 16, minute: 30, second: 0 }, active: false },
  ];

  public gifChoices: GifChoice[] = [
    { name: GifChoiceConstant.Personal, active: false },
    { name: GifChoiceConstant.Giphy, active: true}
  ];

  constructor(private dayService: DayService, private optionsService: OptionsService) { }

  ngAfterViewInit(): void {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);

    this.hourInput.nativeElement.value = now.getHours();
    this.minuteInput.nativeElement.value = now.getMinutes();
  }

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

  public setTime() {
    const hour = parseInt((this.hourInput.nativeElement as HTMLInputElement).value);
    const minute = parseInt((this.minuteInput.nativeElement as HTMLInputElement).value)

    if (hour && minute) {
      this.clocks.forEach(c => c.active = false);
      this.optionsService.currentClock.next({ name: 'customClock', target: { weekday: this.dayService.getCurrentDayIndex(), hour, minute, second: 0 }, active: true });
    }
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

  public isGiphy(): boolean {
    return this.gifChoices.find((c) => c.active).name === GifChoiceConstant.Giphy;
  }
}
