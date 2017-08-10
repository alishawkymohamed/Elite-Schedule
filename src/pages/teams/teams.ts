import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController
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
        });
    });

  }

  itemTapped($event, team) {
    console.log(team);
    this.navCtrl.push(TeamHomePage, team);
  }
}
