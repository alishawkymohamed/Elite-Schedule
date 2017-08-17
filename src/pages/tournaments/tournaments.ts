import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { TeamsPage } from "../pages";
import { EliteApi } from "../../shared/shared";

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments: any;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private EliteApi: EliteApi,
    private loadingController: LoadingController,
    private toast: ToastController
  ) { }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Loading Tournaments ..."
    });
    loader.present();
    this.EliteApi.getTournaments()
      .then(data => {
        if (data) {
          loader.dismiss();
          this.tournaments = data;
        }
        else {
          let toaster = this.toast.create({
            message: "Error in Connection .. Try again latter !!",
            duration: 2000
          })
          loader.dismiss();
          toaster.present();
          this.navCtrl.pop();
        }
      });
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }
}