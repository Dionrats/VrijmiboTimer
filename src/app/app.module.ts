import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { MenuComponent } from "./menu/menu.component";
import { ClockComponent } from "./clock/clock.component";

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TitleComponent } from './title/title.component';
import { HttpClientModule } from '@angular/common/http';
import { DayService } from './services/day.service';
import { HeartbeatService } from './services/heartbeat.service';
import { OptionsService } from './services/options.service';
import { DikkeLeoService } from './services/dikke-leo.service';
import { GifProviderService } from './services/gif-provider.service';
import { PersonalGifService } from './services/personal-gif.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    TitleComponent,
    MenuComponent,
    ClockComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DayService,
    HeartbeatService,
    OptionsService,
    DikkeLeoService,
    GifProviderService,
    PersonalGifService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
