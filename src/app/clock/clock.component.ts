import { Component, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../timer/timer.component';
import { Clock } from '../models/clock.model';
import { Timer } from '../models/timer.model';
import { HeartbeatService } from '../services/heartbeat.service';
import { OptionsService } from '../services/options.service';
import { TitleComponent } from "../title/title.component";
import { DikkeLeoService } from '../services/dikke-leo.service';

@Component({
    selector: 'app-clock',
    standalone: true,
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.sass'],
    imports: [CommonModule, TitleComponent, TimerComponent]
})
export class ClockComponent {

  @ViewChildren(TimerComponent)
  timerComponents: TimerComponent[];

  private done: Subscription;
  private isFinished: Boolean;

  public clock: Clock = {name: 'Vrijmibo', target: {weekday: 5, hour: 16, minute: 30, second: 0}, active: true};

  timers: Timer[] = [
    {title: 'dagen', max: 7, color: '#d86b6b', heartbeat: this.heartbeatService.dayHeartbeat},
    {title: 'uren', max: 24, color: '#ecefcb', heartbeat: this.heartbeatService.hourHeartbeat},
    {title: 'minuten', max: 60, color: '#acc742', heartbeat: this.heartbeatService.minHeartbeat},
    {title: 'seconden', max: 60, color: '#7895d5', heartbeat: this.heartbeatService.secHeartbeat}
  ];

  constructor(private heartbeatService: HeartbeatService, private optionsService: OptionsService, private dikkeLeoService: DikkeLeoService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startClock();
  }

  ngOnDestroy(): void {
    this.done.unsubscribe();
  }

  private finished(): void {
    if(!this.isFinished){
      this.stopClock();
      this.soundAlarm();
      this.isFinished = true;
    }
  }

  public soundAlarm(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = '/assets/sound/Air-Horn-Sound-Effect.mp3';
    audio.load();
    audio.play();
    setTimeout(() => {
      this.dikkeLeoService.sendClickEvent();
    }, 2000);
  }

  public startClock(): void {
    this.isFinished = false;
    this.done = this.heartbeatService.doneEvent.subscribe(() => this.finished());
    this.heartbeatService.start(this.clock.target);
    this.optionsService.currentClock.subscribe(clock => {
      this.heartbeatService.start(clock.target);
      this.timerComponents.forEach(timer => timer.run());
    });
  }

  public stopClock(): void {
    this.timerComponents.forEach(timer => timer.stop());
  }

}
