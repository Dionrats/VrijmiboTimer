import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { GifChoiceConstant } from '../models/gif-choice-constant';
import { DikkeLeoService } from '../services/dikke-leo.service';
import { GifProviderService } from '../services/gif-provider.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass']
})
export class BackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gif', { static: false })
  gif: ElementRef;

  private gifContext = 'cheers';
  private interval: number = 1 * 60 * 1000;
  private runner: any;
  private dikkeLeoRunner: any;

  public currentGifProvider: string;
  public dbGif = GifChoiceConstant.Personal;

  constructor(private gifProvider: GifProviderService, private optionsService: OptionsService, private dikkeLeoService: DikkeLeoService) {
    this.dikkeLeoService.getClickEvent().subscribe(()=>{
      if (this.currentGifProvider === GifChoiceConstant.Personal) {
        this.startDikkeLeo();
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateGif(this.gifContext);
    this.optionsService.currentGifContext.subscribe(newGifContext => {
      this.gifContext = newGifContext;
      this.updateGif(this.gifContext);
    });
    this.optionsService.currentGifChoice.subscribe(newGifChoice => {
      this.currentGifProvider = newGifChoice;
      this.gifProvider.set(newGifChoice);
      this.updateGif(this.gifContext);
    })

    this.setTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.runner);
  }

  public async startDikkeLeo() {
    clearInterval(this.runner);
    const vid = document.getElementById("myVideo") as HTMLMediaElement;
    vid.src = '/assets/sound/dikkeleo.mp4';
    await vid.play();

    this.dikkeLeoRunner = setTimeout(() => {
      vid.pause();
      vid.currentTime = 0;
      vid.src = null;

      this.setTimer();
      this.updateGif(this.gifContext);
      clearTimeout(this.dikkeLeoRunner);
    }, 200000);
  }

  private setTimer() {
    this.runner = setInterval(() => { this.updateGif(this.gifContext); console.log('update'); }, this.interval);
  }

  private updateGif(gifContext: string): void {
    this.gifProvider.get().retrieveGif(gifContext).subscribe((url) => {
      this.showGif(url);
    })
  }

  private showGif(src: string) {
    this.gif.nativeElement.style.backgroundImage = 'URL("' + src + '")';
  }
}
