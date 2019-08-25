import { Injectable } from "@angular/core";
import { PlayerScoreCard } from "../models/player-score-card";

@Injectable({
    providedIn: "root"
})

export class CacheService {

    playerScoreCards: Array<PlayerScoreCard> = [];

    public getRouteCountScore(playerScoreCard: PlayerScoreCard): number {
        if (!playerScoreCard.routeCounts) { return 0; }

        var total = 0;

        playerScoreCard.routeCounts.forEach(routeCount => {
            total = total + (routeCount[0]* routeCount[1].points);
        });

        return total;
    }

    public getTotalScore(playerScoreCard: PlayerScoreCard) : number {
        var total = this.getRouteCountScore(playerScoreCard);

        playerScoreCard.bonusPoints.forEach(b => {
            total = total + b.points;
        });

        return total;
    }

}
