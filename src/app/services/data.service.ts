import { Injectable } from "@angular/core";
import { PlayerColorVM } from "../models/player-color";
import { RouteLengthPoints } from "../models/route-length-points";
import { PlayerScoreCard } from "../models/player-score-card";

@Injectable({
    providedIn: "root"
})

export class DataService {
    private playerColors = new Array<PlayerColorVM>(
        { name: "Green", color: "#FFFFFF", backgroundColor: "#008000", isEnabled: true },
        { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000", isEnabled: true },
        { name: "Yellow", color: "#000000", backgroundColor: "#FFFF00", isEnabled: true },
        { name: "Blue", color: "#FFFFFF", backgroundColor: "#0000FF", isEnabled: true },
        { name: "Black", color: "#FFFFFF", backgroundColor: "#000000", isEnabled: true }
    );

    private routesPoints = new Array<RouteLengthPoints>(
        { length: 1, points: 1, limit: 5 },
        { length: 2, points: 2, limit: 24},
        { length: 3, points: 4, limit: 15 },
        { length: 4, points: 7, limit: 12 },
        { length: 5, points: 10, limit: 8 },
        { length: 6, points: 15, limit: 9 }
    );

    playerScoreCards: Array<PlayerScoreCard> = [];

    getPlayerColors(): Array<PlayerColorVM> {
        return this.playerColors;
    }

    getPlayerColor(colorName: string): PlayerColorVM {
        var foundColor = this.playerColors.filter((color) => color.name === colorName)[0];
        foundColor.isEnabled = false;
        return foundColor;
    }

    getRouteLengthPointsList(): Array<RouteLengthPoints> {
        return this.routesPoints;
    }

    getRouteLengthPoints(trainLength: number): RouteLengthPoints {
        return this.routesPoints.filter((routePoints) => routePoints.length === trainLength)[0];
    }

}
