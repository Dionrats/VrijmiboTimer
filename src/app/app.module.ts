import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ClockComponent } from './clock/clock.component';
import { TitleComponent } from './title/title.component';
import { MenuComponent } from './menu/menu.component';
import { DayService } from './services/day.service';
import { HeartbeatService } from './services/heartbeat.service';
import { OptionsService } from './services/options.service';
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ClockComponent,
    TitleComponent,
    MenuComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DayService,
    HeartbeatService,
    OptionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
