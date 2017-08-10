import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {
    baseUrl: string = "https://elite-schedule-app-cf5f8.firebaseio.com";
    currentTournament: any = {};
    private tourneyData: any = {};
    constructor(private _http: Http) {

    }
    getTournaments() {
        return new Promise(resolve => {
            this._http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    // getTournamentData(tournyID): Observable<any> {
    //     return this._http.get(`${this.baseUrl}/tournaments-data/${tournyID}.json`)
    //         .map((response: Response) => {
    //             this.currentTournament = response.json();
    //             return this.currentTournament;
    //         });
    // }

    getTournamentData(tournyID, forceRefresh: boolean = false): Observable<any> {
        if (!forceRefresh && this.tourneyData[tournyID]) {
            this.currentTournament = this.tourneyData[tournyID];
            return Observable.of(this.currentTournament);
        }
        return this._http.get(`${this.baseUrl}/tournaments-data/${tournyID}.json`)
            .map((response: Response) => {
                this.tourneyData[tournyID] = response.json();
                this.currentTournament = response.json();
                return this.currentTournament;
            });
    }

    refreshCurrentTourney() {
        return this.getTournamentData(this.currentTournament.tournament.id, true);
    }
    getCurrentTournamentData() {
        return this.currentTournament;
    }
}