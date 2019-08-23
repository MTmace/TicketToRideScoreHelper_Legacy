import { Injectable } from "@angular/core";
import { PlayerScoreCard } from "../models/player-score-card";

@Injectable({
    providedIn: "root"
})

export class CacheService {

    playerScoreCards: Array<PlayerScoreCard> = [];

}
