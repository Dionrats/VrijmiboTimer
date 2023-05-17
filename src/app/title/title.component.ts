import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clock } from '../models/clock.model';
import { DayService } from '../services/day.service';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent {

  @Input() public clock: Clock;
  public title: string;

  constructor(private dayService: DayService, private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.title = this.dayService.getMiboDay(this.clock);
    this.optionsService.currentClock.subscribe(clock => this.title = this.dayService.getMiboDay(clock));
  }

}
