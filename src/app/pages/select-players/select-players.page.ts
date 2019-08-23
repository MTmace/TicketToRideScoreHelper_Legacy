import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { PlayerColor } from "../../models/player-color";
import { PlayerScoreCard } from "../../models/player-score-card";
import { ScoringCacheService } from "../../services/scoring-cache.service";

// TODO: Sort ScoreCards by PlayerColor name

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.component.html",
    styleUrls: ["./select-players.css"]
})

export class SelectPlayersPage implements OnInit {
    playerColors: Array<PlayerColor>;

    constructor(private playerColorService: DataService,
        private scoringCacheService: ScoringCacheService) { 
        }

    ngOnInit(): void {
        this.playerColors = this.playerColorService.getPlayerColors();
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor) {
        const foundIndex = this.scoringCacheService.playerScoreCards.findIndex(x => x.playerColor.name === selectedPlayerColor.name);
        foundIndex === -1 ? this.scoringCacheService.playerScoreCards.push(this.getNewScoreCard(selectedPlayerColor)) : this.scoringCacheService.playerScoreCards.splice(foundIndex, 1);
    }

    isEnabled(selectedPlayerColor: string) : boolean {
        return !this.scoringCacheService.playerScoreCards.some(x => x.playerColor.name === selectedPlayerColor);
    }

    private getNewScoreCard(playerColor: PlayerColor): PlayerScoreCard {
        return <PlayerScoreCard>({
          playerColor: playerColor,
          routeCounts: [],
          bonusPoints: []
        });
    }
}