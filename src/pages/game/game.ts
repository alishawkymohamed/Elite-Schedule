import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from "../../shared/shared";
import { TeamHomePage } from "../pages";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi) {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {

  }
  teamClicked($event, teamId) {
    let tournyData = this.eliteApi.getCurrentTournamentData();
    let team = tournyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
