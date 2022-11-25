import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GifService} from '../services/gif.service';
import {OptionsService} from '../services/options.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass']
})
export class BackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gif', {static: false})
  gif: ElementRef;

  private gifContext = 'cheers';
  private interval: number = 2 * 60 * 1000;
  private runner: any;

  constructor(private gifService: GifService, private optionsService: OptionsService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateGif(this.gifContext);
    this.optionsService.currentGifContext.subscribe(newGifContext => {
      this.gifContext = newGifContext;
      this.updateGif(this.gifContext);
    });
    this.runner = setInterval(() => this.updateGif(this.gifContext), this.interval);
  }

  ngOnDestroy(): void {
    clearInterval(this.runner);
  }

  private updateGif(gifContext: string): void {
     this.gifService.getNext(gifContext, data => {
      this.gif.nativeElement.style.backgroundImage = 'URL("' + data.images.original.url + '")';
     });
  }

}
