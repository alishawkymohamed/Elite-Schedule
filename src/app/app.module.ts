import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StandingsPage, TeamHomePage, GamePage, MyTeamsPage, TeamDetailPage, TeamsPage, TournamentsPage, MapPage } from '../pages/pages';
import { EliteApi, UserSettings } from "../shared/shared";
import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [
    MyApp, GamePage, MyTeamsPage, TeamDetailPage, TeamsPage, TournamentsPage, StandingsPage, TeamHomePage, MapPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
       { driverOrder: ['localstorage'] }
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD2-wvU7JGBm5PzL1SFNQc7xT5mq7J68pw'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, GamePage, MyTeamsPage, TeamDetailPage, TeamsPage, TournamentsPage, StandingsPage, TeamHomePage, MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen, HttpModule, EliteApi, UserSettings,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
