import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timer } from '../models/timer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent {

  @Input('timer') timer: Timer;
  state: number;
  subscription: Subscription;

  @ViewChild('circle', {static: false})
  circle: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
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
    const percent = this.remap(this.state, 0, this.timer.max, 0, 100);
    this.renderCircle(percent);
  }

  public run(): void {
    this.subscription = this.timer.heartbeat.subscribe(x => {
      this.state = x;
      this.changeDetectorRef.detectChanges();
      return this.state;
    });
  }

  public stop(): void {
    this.subscription.unsubscribe();
    this.state = 0;
  }

  private renderCircle(percent: number): void {
    const radius = this.circle.nativeElement.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percent / 100 * circumference;

    this.circle.nativeElement.style.strokeDasharray = circumference + ' ' + circumference;
    this.circle.nativeElement.style.strokeDashoffset = offset;
  }

  private remap(value: number, inFrom: number, inTo: number, outFrom: number, outTo: number): number {
      return (value - inFrom) / (inTo - inFrom) * (outTo - outFrom) + outFrom;
  }

}
