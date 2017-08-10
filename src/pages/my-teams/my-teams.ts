import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from "../pages";
import { EliteApi, UserSettings } from "../../shared/shared";

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController,
    private userSettings: UserSettings) { }

  favorites: any[];
  // [{
  //   team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
  //   tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
  //   tournamentName: 'March Madness Tournament'
  // },
  // {
  //   team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
  //   tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
  //   tournamentName: 'Holiday Hoops Challenge'
  // }]

  ionViewDidEnter() {
    let loader = this.loadingController.create({
      content: 'Loading ..'
    });
    loader.present();

    this.userSettings.getAllFavorite().then(data => {
      if (data || null) {
        this.favorites = data;
        loader.dismiss();
      }
    });
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }
  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: "Getting Data ...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => { this.navCtrl.push(TeamHomePage, favorite.team) });
  }
}
