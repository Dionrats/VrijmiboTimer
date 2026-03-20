import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Clock } from '../models/clock.model';
import { DayService } from '../services/day.service';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit, OnDestroy {

  @Input() public clock: Clock;
  public title: string;
  private clockSub: Subscription;

  constructor(private dayService: DayService, private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.title = this.dayService.getMiboDay(this.clock);
    this.clockSub = this.optionsService.currentClock.subscribe(clock => this.title = this.dayService.getMiboDay(clock));
  }

  ngOnDestroy(): void {
    if (this.clockSub) { this.clockSub.unsubscribe(); }
  }

}
