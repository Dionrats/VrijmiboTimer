import { Injectable } from '@angular/core';
import { Clock } from '../models/clock.model';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor() { }


  public getMiboDay(clock: Clock): string {
    if (clock.specialName) {
      return clock.specialName;
    }
    switch (clock.target.weekday) {
      case 1:
        return 'MAMIBO';
      case 2:
        return 'DIMIBO';
      case 3:
        return 'WOMIBO';
      case 4:
        return 'DOMIBO';
      case 5:
        return 'VRIJMIBO';
      case 6:
        return 'ZAMIBO';
      case 7:
        return 'ZOMIBO';
      default:
        return '';
    }
  }

  public getCurrentDayIndex(): number {
    return new Date().getDay();
  }
}
