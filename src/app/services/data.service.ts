import { Injectable } from "@angular/core";
import { PlayerColorVM } from "../models/player-color";
import { RouteLengthPoints } from "../models/route-length-points";
import { PlayerScoreCard } from "../models/player-score-card";
import { BonusPoints } from "../models/bonus-points";

@Injectable({
    providedIn: "root"
})

export class DataService {
    private playerColors = new Array<PlayerColorVM>(
        { name: "Green", color: "#FFFFFF", backgroundColor: "#008000", isEnabled: true, isWinner: false },
        { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000", isEnabled: true, isWinner: false },
        { name: "Yellow", color: "#000000", backgroundColor: "#FFFF00", isEnabled: true, isWinner: false },
        { name: "Blue", color: "#FFFFFF", backgroundColor: "#0000FF", isEnabled: true, isWinner: false },
        { name: "Black", color: "#FFFFFF", backgroundColor: "#000000", isEnabled: true, isWinner: false }
    );

    private routesPointsList = new Array<RouteLengthPoints>(
        { length: 1, points: 1, limit: 5 },
        { length: 2, points: 2, limit: 24},
        { length: 3, points: 4, limit: 15 },
        { length: 4, points: 7, limit: 12 },
        { length: 5, points: 10, limit: 8 },
        { length: 6, points: 15, limit: 9 }
    );

    private bonusPointsList = new Array<BonusPoints>(
        { name: 'Longest Route', points: 10 },
        { name: 'Total Tickets', description: 'manually add up and enter completed tickets' }
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
        return this.routesPointsList;
    }

    getRouteLengthPoints(trainLength: number): RouteLengthPoints {
        return this.routesPointsList.filter((routePoints) => routePoints.length === trainLength)[0];
    }

    getBonusPointsList(): Array<BonusPoints> {
        return this.bonusPointsList;
    }
}
