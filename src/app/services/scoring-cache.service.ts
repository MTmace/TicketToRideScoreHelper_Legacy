import { Injectable } from "@angular/core";
import { PlayerScoreCard } from "../models/player-score-card";

@Injectable({
    providedIn: "root"
})

export class ScoringCacheService {

    playerScoreCards: Array<PlayerScoreCard> = [];

}
