import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
    private userSettings: UserSettings,
    private toast: ToastController) { }

  favorites: any[] = [];

  ionViewDidEnter() {
    let loader = this.loadingController.create({
      content: 'Loading ..'
    });
    loader.present();

    this.userSettings.getAllFavorite().then(data => {
      if (data) {
        this.favorites = data;
        loader.dismiss();
      }
      else {
        let toaster = this.toast.create({
          message: "Error in Connection .. Try again latter !!",
          duration: 2000
        })
        loader.dismiss();
        toaster.present();
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
