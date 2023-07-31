import { Injectable } from '@angular/core';
import { GifService } from './gif.service';
import { PersonalGifService } from './personal-gif.service';
import { IGifRetriever } from './igif-retriever';
import { GifChoiceConstant } from '../models/gif-choice-constant';

@Injectable({
  providedIn: 'root'
})
export class GifProviderService {

  private retriever: IGifRetriever;

  constructor(private gifService: GifService, private personalGifService: PersonalGifService) {
    this.retriever = gifService;
  }

  public set(retrieveType: string) {
    switch (retrieveType) {
      case GifChoiceConstant.Personal:
        this.retriever = this.personalGifService;
        break;
      case GifChoiceConstant.Giphy:
      default:
        this.retriever = this.gifService;
        break;
    }
  }

  public get(): IGifRetriever {
    return this.retriever;
  }
}
