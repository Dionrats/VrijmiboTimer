import {Component, Input, OnInit} from '@angular/core';
import {Clock} from '../models/clock.model';
import {DayService} from '../services/day.service';
import {OptionsService} from '../services/options.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit {

  @Input()
  public clock: Clock;
  public title: string;

  constructor(private dayService: DayService, private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.title = this.dayService.getMiboDay(this.clock);
    this.optionsService.currentClock.subscribe(clock => this.title = this.dayService.getMiboDay(clock));
  }

}
