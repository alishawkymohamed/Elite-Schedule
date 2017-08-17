import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TeamHomePage } from "../pages";
import { EliteApi } from "../../shared/shared";
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamsDivisions: any;
  teams = [];
  queryText: string;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController,
    private toast: ToastController
  ) { }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: "Loading Teams ..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id)
        .subscribe(data => {
          if (data) {
            this.allTeams = data.teams;
            this.allTeamsDivisions =
              _.chain(data.teams)
                .groupBy('division')
                .toPairs()
                .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                .value();

            this.teams = this.allTeamsDivisions
            loader.dismiss();
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
    });

  }

  updateTeams() {
    let quertTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamsDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(quertTextLower))
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });
    this.teams = filteredTeams;
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
