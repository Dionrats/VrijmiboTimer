import { Injectable } from '@angular/core';
import { IGifRetriever } from './igif-retriever';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalGifService implements IGifRetriever {
  private personalGifs: string[] = [
    '/assets/personalgifs/1.gif',
    '/assets/personalgifs/2.gif',
    '/assets/personalgifs/3.gif',
    '/assets/personalgifs/4.gif',
    '/assets/personalgifs/5.gif',
    '/assets/personalgifs/6.gif',
    '/assets/personalgifs/7.gif',
    '/assets/personalgifs/8.gif',
    '/assets/personalgifs/9.gif',
    '/assets/personalgifs/10.gif',
    '/assets/personalgifs/11.gif'
  ]

  constructor() { }

  retrieveGif(context?: string): Observable<string> {
    var number = Math.floor(Math.random() * this.personalGifs.length);
    return of(this.personalGifs[number]);
  }
}
