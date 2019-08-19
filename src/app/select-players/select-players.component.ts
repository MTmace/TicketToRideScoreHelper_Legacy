import { Component, OnInit } from "@angular/core";

import { PlayerColorService } from "../services/player-color.service";
import { PlayerColor } from "../models/player-color";
import { ScoringCacheService } from "../services/scoring-cache.service";

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.component.html",
    styleUrls: ["./select-players.css"]
})

export class SelectPlayersComponent implements OnInit {
    playerColors: Array<PlayerColor>;
    //selectedPlayerColors: Array<PlayerColor>;

    constructor(private playerColorService: PlayerColorService,
        private scoringDataService: ScoringCacheService) { 
        }

    ngOnInit(): void {
        this.playerColors = this.playerColorService.getPlayerColors();
        this.scoringDataService.selectedPlayerColors = this.scoringDataService.selectedPlayerColors;
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor) {
        const foundIndex = this.scoringDataService.selectedPlayerColors.findIndex(x => x.name === selectedPlayerColor.name);
        foundIndex === -1 ? this.scoringDataService.selectedPlayerColors.push(selectedPlayerColor) : this.scoringDataService.selectedPlayerColors.splice(foundIndex, 1);
    }

    isEnabled(selectedPlayerColor: string) : boolean {
        return !this.scoringDataService.selectedPlayerColors.some(x => x.name === selectedPlayerColor);
    }
}
