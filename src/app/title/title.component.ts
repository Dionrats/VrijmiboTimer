import { Component, OnInit, Input } from '@angular/core';
import { Clock } from '../models/clock.model';
import { DayService } from '../services/day.service';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit {

  @Input()
  public clock: Clock; 
  public title: string;

  constructor(private _dayService: DayService, private _optionsService: OptionsService) { }

  ngOnInit(): void {
    this.title = this._dayService.getMiboDay(this.clock);
    this._optionsService.currentClock.subscribe(clock => this.title = this._dayService.getMiboDay(clock));
  }

}