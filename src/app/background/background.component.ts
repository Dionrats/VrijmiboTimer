import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifService } from '../services/gif.service';
import { OptionsService } from '../services/options.service';
import { GifChoiceConstant } from '../models/gif-choice-constant';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass']
})
export class BackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gif', { static: false })
  gif: ElementRef;

  private gifContext = 'cheers';
  //private interval: number = 2 * 60 * 1000;
  //private runner: any;
  private gifChoice: GifChoiceConstant;
  public custom: string;
  public currentGifChoice: string = 'Giphy';

  private personalGifs: string[] = [
    '/assets/personalgifs/1.mp4',
    '/assets/personalgifs/2.mp4',
    '/assets/personalgifs/3.mp4',
    '/assets/personalgifs/4.mp4',
    '/assets/personalgifs/5.mp4',
    '/assets/personalgifs/6.mp4',
    '/assets/personalgifs/7.mp4',
    '/assets/personalgifs/8.mp4',
    '/assets/personalgifs/9.mp4',
    '/assets/personalgifs/10.mp4',
    '/assets/personalgifs/11.mp4'
  ]

  constructor(private gifService: GifService, private optionsService: OptionsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateGif(this.gifContext);
    this.optionsService.currentGifContext.subscribe(newGifContext => {
      this.gifContext = newGifContext;
      this.updateGif(this.gifContext);
    });
    this.optionsService.currentGifChoice.subscribe(newGifChoice => {
      this.gifChoice = newGifChoice;
      this.currentGifChoice = newGifChoice;
      if (this.gifChoice === GifChoiceConstant.Personal) {
        this.startPersonalGifCarousel();
      }
      else if (this.gifChoice === GifChoiceConstant.Giphy) {
        this.updateGif(this.gifContext);
      }
    })
    //this.runner = setInterval(() => { this.updateGif(this.gifContext); console.log('update'); }, this.interval);
  }

  ngOnDestroy(): void {
    //clearInterval(this.runner);
  }

  private startPersonalGifCarousel(): void {
    const myGifUrl = '/assets/personalgifs/10.mp4';
    this.custom = myGifUrl;
  }

  private updateGif(gifContext: string): void {
    this.gifService.getNext(gifContext, data => {
      this.gif.nativeElement.style.backgroundImage = 'URL("' + data.images.original.url + '")';
    });
  }
}
