import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApi } from "../../shared/shared";
declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};
  location: any;

  constructor(private eliteApi: EliteApi, private navParams: NavParams) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTournamentData();
    this.location = tourneyData.locations[games.locationId];
    console.log(this.location);
    this.map = {
      lat: this.location.latitude,
      lng: this.location.longitude,
      zoom: 12,
      markerLabel: games.location
    };
  }
  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
}
