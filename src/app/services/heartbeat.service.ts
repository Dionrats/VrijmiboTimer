import { EventEmitter, Injectable } from '@angular/core';
import { Target } from '../models/target.model';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {

  private interval = 999;

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
    const millis: number = this.computeMillisRemaining();
    const secs = this.inSecs(millis);
    const mins = this.inMins(millis);
    const hours = this.inHours(millis);
    const days = this.inDays(millis);
    if (secs <= 0 && mins <= 0 && hours <= 0 && days <= 0) {
      this.doneEvent.emit();
      clearInterval(this.runner);
    } else {
      this.secHeartbeat.emit(secs);
      if (secs === 59 || eager) {
        this.minHeartbeat.emit(mins);
        if (mins === 59 || eager) {
          this.hourHeartbeat.emit(hours);
          if (hours === 23 || eager) {
            this.dayHeartbeat.emit(days);
          }
        }
      }
    }
  }

  private computeMillisRemaining(): number {
    const now: Date = new Date();
    const diff: number = this.target.date.getTime() - now.getTime();
    return Math.trunc(diff);
  }

  private computeTargetDate(): Date {
     const date: Date = new Date();

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
    return Math.floor(millis / 1000 / 60 % 60);
  }

  private inHours(millis: number): number {
    return Math.floor(millis / 1000 / 60 / 60 % 24);
  }

  private inDays(millis: number): number {
    return Math.floor(millis / 1000 / 60 / 60 / 24 % 7);
  }}
