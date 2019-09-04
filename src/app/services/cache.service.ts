import { Injectable } from "@angular/core";
import { PlayerScoreCard } from "../models/player-score-card";
import { GameProfile} from "../models/game-profile";
import { PlayerColor } from "../models/player-color";

@Injectable({
    providedIn: "root"
})

export class CacheService {

    gameProfile: GameProfile;

    playerScoreCards: Array<PlayerScoreCard> = [];

    public getRouteCountScore(playerScoreCard: PlayerScoreCard): number {
        if (!playerScoreCard.routeLengthPointsCount) { return 0; }

        var total = 0;

        playerScoreCard.routeLengthPointsCount.forEach(routeCount => {
            total = total + (routeCount[0]* routeCount[1].points);
        });

        return total;
    }

    public getTotalScore(playerScoreCard: PlayerScoreCard) : number {
        var total = this.getRouteCountScore(playerScoreCard);

        playerScoreCard.bonusPointsCount.forEach(b => {
            total = total + b.points;
        });

        return total;
    }

    public removeScoreCard(scoreCardIndex: number): void {
        this.playerScoreCards.splice(scoreCardIndex, 1)
    }

    public createScoreCard(playerColor: PlayerColor): PlayerScoreCard {
        const bonusPoints = this.gameProfile.bonusPointsDefinitions;

        var playerScoreCard = <PlayerScoreCard>({
          playerColor: playerColor,
          routeLengthPointsCount: [],
          bonusPointsCount: []
        });

        bonusPoints.forEach(bonusPoint => {
            playerScoreCard.bonusPointsCount.push({
                name: bonusPoint.name,
                points: 0,
                bonusPointsBehavior: bonusPoint.bonusPointsBehavior,
                description: bonusPoint.description
            })
        });

        this.playerScoreCards.push(playerScoreCard);

        return playerScoreCard;
    }

    public changeGame(newGameProfile: GameProfile) {
        this.gameProfile = newGameProfile;
        this.playerScoreCards = [];
    }

}
