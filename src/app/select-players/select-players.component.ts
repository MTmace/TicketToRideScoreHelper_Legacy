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

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
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
