import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { PlayerColor } from "../../models/player-color";
import { PlayerScoreCard } from "../../models/player-score-card";
import { CacheService } from "../../services/cache.service";

// TODO: Sort ScoreCards by PlayerColor name

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.page.html",
    styleUrls: ["./select-players.page.css"]
})

export class SelectPlayersPage implements OnInit {
    playerColors: Array<PlayerColor>;

    constructor(private dataService: DataService,
        private cacheService: CacheService) { 
        }

    ngOnInit(): void {
        this.playerColors = this.dataService.getPlayerColors();
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor) {
        const foundIndex = this.cacheService.playerScoreCards.findIndex(x => x.playerColor.name === selectedPlayerColor.name);
        foundIndex === -1 ? this.cacheService.playerScoreCards.push(this.getNewScoreCard(selectedPlayerColor)) : this.cacheService.playerScoreCards.splice(foundIndex, 1);
    }

    isEnabled(selectedPlayerColor: string) : boolean {
        return !this.cacheService.playerScoreCards.some(x => x.playerColor.name === selectedPlayerColor);
    }

    private getNewScoreCard(playerColor: PlayerColor): PlayerScoreCard {
        const bonusPoints = this.dataService.getBonusPointsDefinitions();

        var playerScoreCard = <PlayerScoreCard>({
          playerColor: playerColor,
          routeLengthPointsCount: [],
          bonusPointsCount: []
        });

        bonusPoints.forEach(bonusPoint => {
            playerScoreCard.bonusPointsCount.push({
                name: bonusPoint.name,
                points: 0,
                description: bonusPoint.description})
            });

        return playerScoreCard;
    }
}