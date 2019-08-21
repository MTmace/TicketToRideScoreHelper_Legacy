import { Injectable } from "@angular/core";
import { PlayerColor, PlayerColorVM } from "../models/player-color";

@Injectable({
    providedIn: "root"
})

export class PlayerColorService {
    private playerColors = new Array<PlayerColorVM>(
        { name: "Green", color: "#FFFFFF", backgroundColor: "#008000", isEnabled: true },
        { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000", isEnabled: true },
        { name: "Yellow", color: "#000000", backgroundColor: "#FFFF00", isEnabled: true },
        { name: "Blue", color: "#FFFFFF", backgroundColor: "#0000FF", isEnabled: true },
        { name: "Black", color: "#FFFFFF", backgroundColor: "#000000", isEnabled: true }
    );

    getPlayerColors(): Array<PlayerColorVM> {
        return this.playerColors;
    }

    getPlayerColor(colorName: string): PlayerColorVM {
        var foundColor = this.playerColors.filter((color) => color.name === colorName)[0];
        foundColor.isEnabled = false;
        return foundColor;
    }

}
