import { Injectable } from '@angular/core';
import { IGifRetriever } from './igif-retriever';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonalGifService implements IGifRetriever {
  private basePath = '/assets/personalgifs/';
  private gifsPath = '/assets/personalgifs.json';
  private gifs: string[];

  constructor(private http: HttpClient) {
    this.fetchGifFilenames();
  }

  private fetchGifFilenames() {
    this.http
      .get<{ gifs: string[] }>(this.gifsPath)
      .subscribe((data) => {
        this.gifs = data.gifs;
      });
  }

  retrieveGif(context?: string): Observable<string> {
    if (!this.gifs) {
      return of('');
    }
    const randomIndex = Math.floor(Math.random() * this.gifs.length);
    const gifUrl = this.basePath + this.gifs[randomIndex];
    return of(gifUrl);
  }
}
