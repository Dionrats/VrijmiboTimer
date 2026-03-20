import { Component, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../timer/timer.component';
import { Clock } from '../models/clock.model';
import { Timer } from '../models/timer.model';
import { HeartbeatService } from '../services/heartbeat.service';
import { OptionsService } from '../services/options.service';
import { videoService } from '../services/video.service';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.sass'],
})
export class ClockComponent {

  @ViewChildren(TimerComponent)
  timerComponents: TimerComponent[];

  private done: Subscription;
  private clockSub: Subscription;
  private isFinished: Boolean;

  public clock: Clock = {name: 'Vrijmibo', target: {weekday: 5, hour: 16, minute: 30, second: 0}, active: true};

  timers: Timer[] = [
    {title: 'dagen', max: 7, color: '#d86b6b', heartbeat: this.heartbeatService.dayHeartbeat},
    {title: 'uren', max: 24, color: '#ecefcb', heartbeat: this.heartbeatService.hourHeartbeat},
    {title: 'minuten', max: 60, color: '#acc742', heartbeat: this.heartbeatService.minHeartbeat},
    {title: 'seconden', max: 60, color: '#7895d5', heartbeat: this.heartbeatService.secHeartbeat}
  ];

  constructor(private heartbeatService: HeartbeatService, private optionsService: OptionsService, private videoService: videoService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startClock();
  }

  ngOnDestroy(): void {
    this.done.unsubscribe();
    if (this.clockSub) { this.clockSub.unsubscribe(); }
  }

  private finished(): void {
    if(!this.isFinished){
      this.stopClock();
      this.soundAlarm();
      this.isFinished = true;
    }
  }

  public soundAlarm(): void {
    const audio: HTMLAudioElement = new Audio('/assets/sound/Air-Horn-Sound-Effect.mp3');

    audio.addEventListener('ended', () => {
      this.videoService.sendClickEvent();
    });

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setTimeout(() => {
          audio.play().catch(() => {
            this.videoService.sendClickEvent();
          });
        }, 1000);
      });
    }
  }

  public startClock(): void {
    this.isFinished = false;
    this.done = this.heartbeatService.doneEvent.subscribe(() => this.finished());
    this.heartbeatService.start(this.clock.target);
    this.clockSub = this.optionsService.currentClock.subscribe(clock => {
      this.stopClock();
      this.isFinished = false;
      if (this.done) { this.done.unsubscribe(); }
      this.done = this.heartbeatService.doneEvent.subscribe(() => this.finished());
      this.heartbeatService.start(clock.target);
      this.timerComponents.forEach(timer => timer.run());
    });
  }

  public stopClock(): void {
    this.timerComponents.forEach(timer => timer.stop());
  }

}
