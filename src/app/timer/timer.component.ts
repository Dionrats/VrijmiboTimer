import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Timer } from '../models/timer.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {

  @Input("timer")
  timer: Timer;
  state: number;
  subscription: Subscription;

  @ViewChild("circle", {static: false})
  circle: ElementRef

  constructor() {
  }

  ngOnInit(): void {
    this.run();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  ngAfterViewInit(): void {
    this.circle.nativeElement.style.stroke = this.timer.color;
  }

  ngAfterViewChecked(): void {
    let percent = 100 - this.remap(this.state, 0, this.timer.max, 0, 100);
    this.renderCircle(percent);
  }

  public run(): void {
    this.subscription = this.timer.heartbeat.subscribe(x => this.state = x);
  }

  public stop(): void {
    this.subscription.unsubscribe();
    this.state = 0;
  }

  private renderCircle(percent: number): void {
    let radius = this.circle.nativeElement.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    let offset = circumference - percent / 100 * circumference;

    this.circle.nativeElement.style.strokeDasharray = circumference + " " + circumference;
    this.circle.nativeElement.style.strokeDashoffset = offset;
  }

  private remap(value: number, inFrom: number, inTo: number, outFrom: number, outTo: number): number {
      return (value - inFrom) / (inTo - inFrom) * (outTo - outFrom) + outFrom;
  }

}
