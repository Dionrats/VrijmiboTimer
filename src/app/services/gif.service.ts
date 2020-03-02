import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { giphyResponse } from '../models/giphyResponse.model';
import { Observable } from 'rxjs';
import { giphyResonseDataPartial } from '../models/giphyResponseDataPartial.model';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private giffOffset: number = 25;
  private apiKey: string = 'giCw4wRipPDvGIroMwxXpZCvJN5QkQMN';

  constructor(private http: HttpClient) { }

  public getNext(giffSearchContext: string, callback: (data: giphyResonseDataPartial) => void): void {
    let offset = Math.trunc(Math.random() * this.giffOffset);
    this.getGifFromGiphy(giffSearchContext, offset).subscribe(response => callback(response.data[0]));
  }

  private getGifFromGiphy(giffSearchContext: string, offset: number): Observable<giphyResponse> {
    let query = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&q=' + giffSearchContext + '&limit=1&offset=' + offset + '&rating=G';
    return this.http.get<giphyResponse>(query);
    
  }
}
