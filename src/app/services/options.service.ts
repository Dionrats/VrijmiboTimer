import { Injectable, EventEmitter } from '@angular/core';
import { Clock } from '../models/clock.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public currentClock: Subject<Clock> = new Subject();
  public currentGifContext: Subject<string> = new Subject();

  constructor() { }
}
