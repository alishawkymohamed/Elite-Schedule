import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import { EliteApi, UserSettings } from "../../shared/shared";
import { GamePage } from "../pages";
import * as moment from 'moment';
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  team: any;
  games: any[];
  tournyData: any;
  teamStanding: any;
  useDateFilter: boolean = false;
  color: string;
  isFollowing: boolean = false;

  constructor(
    private alertCTRL: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private eliteApi: EliteApi,
    private userSettings: UserSettings) { }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tournyData = this.eliteApi.getCurrentTournamentData();
    this.games = _.chain(this.tournyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = g.team1Id === this.team.id;
        let opponentTeam = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentTeam,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at"),
          team1: g.team1,
          team2: g.team2
        };
      })
      .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tournyData.standings, { 'teamId': this.team.id });
    this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (!isTeam1 ? team1Score : team2Score);
      var winIndicator = teamScore > opponentScore ? "Win: " : "Lose: ";
      return winIndicator + teamScore + " - " + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourcGame = this.tournyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourcGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }
    else {
      this.games = this.allGames;
    }
  }
  getScoreWorL(game) {
    // return game.scoreDisplay ? game.scoreDisplay[0] : '';
    if (game.scoreDisplay) {
      return game.scoreDisplay[0];
    }
    else {
      return '';
    }
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertCTRL.create({
        title: "Unfollow !!",
        message: "Are you sure you want to unfollow ?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unFavoriteTeam(this.team);

              let toast = this.toastCtrl.create({
                message: 'You Unfollowed this Team Successfully !!',
                duration: 1500,
                position: 'bottom',
                showCloseButton: true
              });

              toast.present();
            }
          },
          {
            text: "No",
          }
        ]
      });
      confirm.present();
    }
    else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team,
        this.tournyData.tournament.id,
        this.tournyData.tournament.name);
    }
  }

  getScoreDisplayBadge(game) {
    if (game.scoreDisplay.length > 0) {
      if (game.scoreDisplay[0].indexOf('W') == 0) {
        return 'primary';
      }
      else {
        return 'danger';
      }
    }
  }

  refreshAll(refresher) {
    console.log(refresher);
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    })
  }
}
