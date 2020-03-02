import { Injectable, EventEmitter } from '@angular/core';
import { Target } from '../models/target.model';

@Injectable()
export class HeartbeatService {

  private interval: number = 999;

  private target: Target;
  private runner: any;

  public secHeartbeat: EventEmitter<number> = new EventEmitter();
  public minHeartbeat: EventEmitter<number> = new EventEmitter();
  public hourHeartbeat: EventEmitter<number> = new EventEmitter();
  public dayHeartbeat: EventEmitter<number> = new EventEmitter();

  public doneEvent: EventEmitter<void> = new EventEmitter();

  constructor() { 
  }

  public start(target: Target): void {
    this.target = target;
    this.target.date = this.computeTargetDate();
    this.emitHeartbeat(true);
    this.runner = setInterval(() => this.emitHeartbeat(false), this.interval);
  }

  private emitHeartbeat(eager: boolean): void {
    let millis: number = this.computeMillisRemaining();
    let secs = this.inSecs(millis);
    let mins = this.inMins(millis);
    let hours = this.inHours(millis);
    let days = this.inDays(millis);
    if (secs <= 0 && mins <= 0 && hours <= 0 && days <= 0) {
      this.doneEvent.emit();999
      clearInterval(this.runner);
    } else {
      this.secHeartbeat.emit(secs);
      if(secs === 59 || eager) {
        this.minHeartbeat.emit(mins);
        if(mins === 59 || eager) {
          this.hourHeartbeat.emit(hours);
          if(hours === 23 || eager) {
            this.dayHeartbeat.emit(days);
          }
        }
      } 
    }
  }

  private computeMillisRemaining(): number {
    let now: Date = new Date();
    let diff: number = this.target.date.getTime() - now.getTime();
    return Math.trunc(diff);
  }

  private computeTargetDate(): Date {
     let date: Date = new Date();

     date.setDate(date.getDate() + (this.target.weekday + 7 - date.getDay()) % 7);
     date.setHours(this.target.hour);
     date.setMinutes(this.target.minute);
     date.setSeconds(this.target.second);

    return date;
  }

  private inSecs(millis: number): number {
    return Math.floor(millis / 1000 % 60);
  }

  private inMins(millis: number): number {
    return Math.floor(millis / 1000 / 60 % 60)
  }

  private inHours(millis: number): number {
    return Math.floor(millis / 1000 / 60 / 60 % 24);
  }

  private inDays(millis: number): number {
    return Math.floor(millis / 1000 / 60 / 60 / 24 % 7)
  }


}
