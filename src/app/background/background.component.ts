import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { GifService } from '../services/gif.service';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass']
})
export class BackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gif', {static: false})
  gif: ElementRef

  private gifContext: string = 'cheers';
  private interval: number = 2 * 60 * 1000;
  private runner: any;

  constructor(private _gifService: GifService, private _optionsService: OptionsService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.updateGif(this.gifContext);
    this._optionsService.currentGifContext.subscribe(newGifContext => {
      this.gifContext = newGifContext;
      this.updateGif(this.gifContext);
    });
    this.runner = setInterval(() => this.updateGif(this.gifContext), this.interval);
  }

  ngOnDestroy(): void {
    clearInterval(this.runner);
  }

  private updateGif(gifContext: string): void {
     this._gifService.getNext(gifContext, data => {
      this.gif.nativeElement.style.backgroundImage = 'URL("' + data.images.original.url + '")';
     });
  }

}
