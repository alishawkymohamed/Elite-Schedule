import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from "../../shared/shared";
import * as _ from 'lodash';
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  team: any;
  allStandings: any[];
  standings: any[];
  divisionFilter: string = "division";

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi) { }

  ionViewDidLoad() {
    let tournyData = this.eliteApi.getCurrentTournamentData();
    this.standings = tournyData.standings;
    this.team = this.navParams.data;


    // this.allStandings = _.chain(this.standings)
    //   .groupBy('division')
    //   .toPairs()
    //   .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //   .value();
    //console.log( this.standings );
    this.allStandings = tournyData.standings;
    this.filterDivision()
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    }
    else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }

}
