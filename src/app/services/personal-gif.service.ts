import { Injectable } from '@angular/core';
import { IGifRetriever } from './igif-retriever';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalGifService implements IGifRetriever {
  private basePath = '/assets/personalgifs/'
  private gifCount = 21;

  constructor() { }

  retrieveGif(context?: string): Observable<string> {
    let number = Math.floor(Math.random() * this.gifCount);
    number = number == 0 ? 1 : number;
    return of(this.basePath + number + ".gif");
  }
}