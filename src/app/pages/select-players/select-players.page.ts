import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { PlayerColor } from "../../models/player-color";
import { PlayerScoreCard } from "../../models/player-score-card";
import { CacheService } from "../../services/cache.service";
import { BonusPointsPage } from "../bonus-points/bonus-points.page";
import { BonusPoints } from "~/app/models/bonus-points";

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
        const bonusPoints = this.dataService.getBonusPointsList();

        var c = <PlayerScoreCard>({
          playerColor: playerColor,
          routeCounts: [],
          bonusPoints: []
        });

        // bonusPoints.forEach(bonusPoint => {
        //     c.bonusPoints.push(<BonusPoints>({
        //         name: bonusPoint.name,
        //         points: bonusPoint.points,
        //         description: bonusPoint.points})
        //     });

        return c;
    }
}