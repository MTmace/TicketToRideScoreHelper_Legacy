import { Injectable } from "@angular/core";
import { PlayerColor } from "../models/player-color";
import { RouteLengthPointsDefinition } from "../models/route-length-points-definition";
import { BonusPointsDefinition } from "../models/bonus-points-definition";
import { GameProfile } from "../models/game-profile";
import { ExpansionDefinition } from "../models/expansion-definition";

@Injectable({
    providedIn: "root"
})

export class DataService {

    private gameProfiles = new Array<GameProfile>(
        { 
            name: "USA",
            playerColors: new Array<PlayerColor>(
                { name: "Green", color: "#FFFFFF", backgroundColor: "#008000" },
                { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000" },
                { name: "Yellow", color: "#000000", backgroundColor: "#FFFF00" },
                { name: "Blue", color: "#FFFFFF", backgroundColor: "#0000FF" },
                { name: "Black", color: "#FFFFFF", backgroundColor: "#000000" }
            ),
            routeLengthPointsDefinitions: new Array<RouteLengthPointsDefinition>(
                { length: 1, points: 1, limit: 5 },
                { length: 2, points: 2, limit: 24},
                { length: 3, points: 4, limit: 15 },
                { length: 4, points: 7, limit: 12 },
                { length: 5, points: 10, limit: 8 },
                { length: 6, points: 15, limit: 9 }
            ),
            bonusPointsDefinitions: new Array<BonusPointsDefinition>(
                { name: 'Trans America', bonusPointsBehavior: 'Boolean', points: 10, description: '10 points for the longest train' },
                { name: 'Total Tickets', bonusPointsBehavior: 'TotalPoints', description: 'manually add up and enter completed tickets' }
            ),
            description: "Ticket to Ride: USA",
            expansionDefinitions: new Array<ExpansionDefinition>({
                name: "USA 1910 : Globetrotter",
                bonusPointsDefinitions: new Array<BonusPointsDefinition>(
                    { name: 'Globetrotter', bonusPointsBehavior: 'Boolean', points: 15, description: '15 points the most completed tickets' }
                ),
                description: "USA 1910 card expansion"
            })
        }, {
            name: "Nordic",
            playerColors: new Array<PlayerColor>(
                { name: "White", color: "#000000", backgroundColor: "#FFFFFF" },
                { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000" },
                { name: "Purple", color: "#FFFFFF", backgroundColor: "#800080" }
            ),
            routeLengthPointsDefinitions: new Array<RouteLengthPointsDefinition>(
                { length: 1, points: 1 },
                { length: 2, points: 2 },
                { length: 3, points: 4 },
                { length: 4, points: 7 },
                { length: 5, points: 10 },
                { length: 6, points: 15 },
                { length: 9, points: 27 }
            ),
            bonusPointsDefinitions: new Array<BonusPointsDefinition>(
                { name: 'Globetrotter', points: 10, bonusPointsBehavior: 'Boolean', description: '10 points the most completed tickets' },
                { name: 'Total Tickets', bonusPointsBehavior: 'TotalPoints', description: 'manually add up and enter completed tickets' }
            ),
            description: "Ticket to Ride: Nordic Countries"
        }, {
            name: "Europe",
            playerColors: new Array<PlayerColor>(
                { name: "Green", color: "#FFFFFF", backgroundColor: "#008000" },
                { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000" },
                { name: "Yellow", color: "#000000", backgroundColor: "#FFFF00" },
                { name: "Blue", color: "#FFFFFF", backgroundColor: "#0000FF" },
                { name: "Black", color: "#FFFFFF", backgroundColor: "#000000" }
            ),
            routeLengthPointsDefinitions: new Array<RouteLengthPointsDefinition>(
                { length: 1, points: 1 },
                { length: 2, points: 2 },
                { length: 3, points: 4 },
                { length: 4, points: 7 },
                { length: 6, points: 15 },
                { length: 8, points: 21 }
            ),
            bonusPointsDefinitions: new Array<BonusPointsDefinition>(
                { name: 'European Express', points: 10, bonusPointsBehavior: 'Boolean', description: '10 points for the longest train' },
                { name: 'Unused Stations', points: 4, bonusPointsBehavior: 'PointsPer', description: '4 points for each unused station' },
                { name: 'Total Tickets', bonusPointsBehavior: 'TotalPoints', description: 'manually add up and enter completed tickets' }
            ),
            description: "Ticket to Ride: Nordic Countries"
        }, {
            name: "Germany",
            playerColors: new Array<PlayerColor>(
                { name: "Purple", color: "#FFFFFF", backgroundColor: "#800080" },
                { name: "Red", color: "#FFFFFF", backgroundColor: "#FF0000" },
                { name: "Yellow", color: "#000000", backgroundColor: "#FFFF00" },
                { name: "White", color: "#000000", backgroundColor: "#FFFFFF" },
                { name: "Black", color: "#FFFFFF", backgroundColor: "#000000" }
            ),
            routeLengthPointsDefinitions: new Array<RouteLengthPointsDefinition>(
                { length: 1, points: 1 },
                { length: 2, points: 2 },
                { length: 3, points: 4 },
                { length: 4, points: 7 },
                { length: 5, points: 10 },
                { length: 6, points: 15 },
                { length: 7, points: 18 }
            ),
            bonusPointsDefinitions: new Array<BonusPointsDefinition>(
                { name: 'Globetrotter', points: 15, bonusPointsBehavior: 'Boolean', description: '10 points the most completed tickets' },
                { name: 'Most passengers', points: 20, bonusPointsBehavior: 'PointsPer', description: '20 points for passenger color leader' },
                { name: '2nd most passengers', points: 10, bonusPointsBehavior: 'PointsPer', description: '10 points for passenger color has 2nd most' },
                { name: 'Total Tickets', bonusPointsBehavior: 'TotalPoints', description: 'manually add up and enter completed tickets' }
            ),
            description: "Ticket to Ride: Germany"
        }
    )

    getGameProfiles(): Array<GameProfile> {
        return this.gameProfiles;
    }
}
