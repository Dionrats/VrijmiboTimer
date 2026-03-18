import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionsService } from '../services/options.service';
import { GifChoiceConstant } from '../models/gif-choice-constant';
import { videoService } from '../services/video.service';
import { GifProviderService } from '../services/gif-provider.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass']
})
export class BackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gif', { static: false })
  gif: ElementRef;

  public videoUrl = '/assets/sound/Joost.mp4';
  public videoStartTime = 8;

  private gifContext = 'cheers';
  private interval: number = 1 * 60 * 1000;
  private runner: any;
  private gifContextSub: Subscription;
  private gifChoiceSub: Subscription;
  private videoSub: Subscription;

  public currentGifProvider: string;
  public dbGif = GifChoiceConstant.Personal;

  constructor(private gifProvider: GifProviderService, private optionsService: OptionsService, private videoService: videoService) {
    this.videoService.getClickEvent().subscribe(()=>{
      if (this.currentGifProvider === GifChoiceConstant.Personal) {
        this.startVideo();
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateGif(this.gifContext);
    this.gifContextSub = this.optionsService.currentGifContext.subscribe(newGifContext => {
      this.gifContext = newGifContext;
      this.updateGif(this.gifContext);
    });
    this.gifChoiceSub = this.optionsService.currentGifChoice.subscribe(newGifChoice => {
      this.currentGifProvider = newGifChoice;
      this.gifProvider.set(newGifChoice);
      this.updateGif(this.gifContext);
    });
    this.videoSub = this.optionsService.currentVideo.subscribe(url => {
      this.videoUrl = url;
    });
    this.optionsService.currentVideoStartTime.subscribe(seconds => {
      this.videoStartTime = seconds;
    });

    this.setTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.runner);
    if (this.gifContextSub) { this.gifContextSub.unsubscribe(); }
    if (this.gifChoiceSub) { this.gifChoiceSub.unsubscribe(); }
    if (this.videoSub) { this.videoSub.unsubscribe(); }
  }

  public startVideo() {
    clearInterval(this.runner);
    const vid = document.getElementById('myVideo') as HTMLVideoElement;

    const onEnded = () => {
      vid.removeEventListener('ended', onEnded);
      vid.src = '';
      vid.style.display = 'none';
      this.setTimer();
      this.updateGif(this.gifContext);
    };

    vid.addEventListener('ended', onEnded);
    vid.src = this.videoUrl + '#t=' + this.videoStartTime;
    vid.style.display = 'block';
    vid.play().catch(() => {});
  }

  private setTimer() {
    this.runner = setInterval(() => { this.updateGif(this.gifContext); }, this.interval);
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
