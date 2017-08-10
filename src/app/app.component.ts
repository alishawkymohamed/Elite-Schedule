import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StandingsPage, TeamHomePage, GamePage, MyTeamsPage, TeamDetailPage, TeamsPage, TournamentsPage } from '../pages/pages';
import { UserSettings } from "../shared/userSettings";
import { EliteApi } from "../shared/shared";


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favoriteTeams: any[];
  constructor(public platform: Platform,
    private events: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private eliteApi: EliteApi,
    private loadingController: LoadingController,
    private userSettings: UserSettings) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.refreshFavorites();
      this.events.subscribe('fav:changed', () => { this.refreshFavorites(); });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournament() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: "Getting Data ...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => { this.nav.push(TeamHomePage, favorite.team) });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorite().then(data => {
      if (data) {
        this.favoriteTeams = data;
      }
    });
  }
}
