import { Component, OnInit } from "@angular/core";

import { PlayerColorService } from "../services/player-color.service";
import { PlayerColor } from "../models/player-color";

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.component.html",
    styleUrls: ["./select-players.css"]
})

export class SelectPlayersComponent implements OnInit {
    playerColors: Array<PlayerColor>;
    selectedPlayerColors: Array<PlayerColor> = [];

    constructor(private playerColorService: PlayerColorService) { }

    ngOnInit(): void {
        this.playerColors = this.playerColorService.getPlayerColors();
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor) {
        const foundIndex = this.selectedPlayerColors.findIndex(x => x.name === selectedPlayerColor.name);
        foundIndex === -1 ? this.selectedPlayerColors.push(selectedPlayerColor) : this.selectedPlayerColors.splice(foundIndex, 1);
    }

    isEnabled(selectedPlayerColor: string) : boolean {
        return !this.selectedPlayerColors.some(x => x.name === selectedPlayerColor);
    }
}
