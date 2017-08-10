import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { Events } from "ionic-angular";
@Injectable()
export class UserSettings {

    constructor(private storage: Storage,
        private events: Events) { }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish('fav:changed');
    }

    unFavoriteTeam(team) {
        this.storage.remove(team.id);
        this.events.publish('fav:changed');
    }

    isFavoriteTeam(teamId) {
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getAllFavorite() {
        let items: any[] = [];
        return this.storage.forEach(element => {
            items.push(JSON.parse(element));
        }).then(() => {
            return items.length > 0 ? items : null;
        });
    }
}