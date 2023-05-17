import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { giphyResponse } from '../models/giphyResponse.model';
import { GiphyResponseDataPartial } from '../models/giphyResponseDataPartial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private giffOffset = 25;
  private apiKey = '9tX8qZHZBaZJiJ5AsymKYJl0iYa3uBZX';

  constructor(private http: HttpClient) { }

  public getNext(giffSearchContext: string, callback: (data: GiphyResponseDataPartial) => void): void {
    const offset = Math.trunc(Math.random() * this.giffOffset);
    this.getGifFromGiphy(giffSearchContext, offset).subscribe(response => callback(response.data[0]));
  }

  private getGifFromGiphy(giffSearchContext: string, offset: number): Observable<giphyResponse> {
    const query = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey
      + '&q=' + giffSearchContext + '&limit=1&offset=' + offset + '&rating=G';
    return this.http.get<giphyResponse>(query);

  }
}
