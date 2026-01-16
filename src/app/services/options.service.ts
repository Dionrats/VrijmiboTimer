import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Clock } from '../models/clock.model';
import { GifChoice } from '../models/gif-choice';
import { GifChoiceConstant } from '../models/gif-choice-constant';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public currentClock: Subject<Clock> = new Subject();
  public currentGifContext: Subject<string> = new Subject();
  public currentGifChoice: Subject<GifChoiceConstant> = new Subject();

  constructor() { }
}
