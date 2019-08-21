import { Component, OnInit } from "@angular/core";
import { ScoringCacheService } from "../services/scoring-cache.service";
import { DataService } from "../services/data.service";
import { RouteLengthPoints } from "../models/route-length-points";
import { PlayerScoreCard } from "../models/player-score-card";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";

@Component({
    selector: "mt-scoring-routes",
    moduleId: module.id,
    templateUrl: "./scoring-routes.component.html",
    styleUrls: ["./scoring-routes.css"]
})

export class ScoringRoutesComponent implements OnInit {
    // Tap and long press are both triggered with long press. So we need to handle 1 event 'onTouch'
    // then we determine if the touch event is a tap or long press
    start: number;
    end: number;

    constructor(private scoringCacheService: ScoringCacheService,
        private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    // TODO: move to service
    addRouteToCard(routeLengthPoints: RouteLengthPoints, playerScoreCard: PlayerScoreCard) {
        // check to see if the route has been added to the score card
        var routeCount = playerScoreCard.routeCounts.find(x => x[1].length === routeLengthPoints.length);

        if (!routeCount) {
            // not route was found, so add it
            playerScoreCard.routeCounts.push([1, routeLengthPoints]);
        } else {
            routeCount[0] = routeCount[0] + 1;
        }
    }

    // TODO: move to service
    removeRouteFromCard(routeLengthPoints: RouteLengthPoints, playerScoreCard: PlayerScoreCard) {
        // check to see if the route has been added to the score card
        var routeCount = playerScoreCard.routeCounts.find(x => x[1].length === routeLengthPoints.length);

        if (routeCount && routeCount[0] > 0 ) {
            routeCount[0] = routeCount[0] - 1;
        }
    }

    getRouteLengthPoints(routeLengthPoints: RouteLengthPoints, playerScoreCard: PlayerScoreCard): number {
        // check to see if the route has been added to the score card
        const routeCount = playerScoreCard.routeCounts.find(x => x[1].length === routeLengthPoints.length);
        var count = 0;

        return routeCount ? routeCount[0] : count;
    }

    // TODO: move to service
    getScore(playerScoreCard: PlayerScoreCard): number {
        if (!playerScoreCard.routeCounts) { return 0; }

        var total = 0;
        playerScoreCard.routeCounts.forEach(routeCount => {
            total = total + (routeCount[0]* routeCount[1].points);
        });

        return total;
    }

    onTouch(args: TouchGestureEventData, routeLengthPoints: RouteLengthPoints, playerScoreCard: PlayerScoreCard) {
        if(args.action === "down") {
          this.start = new Date().getMilliseconds();
        }

        if(args.action === "up") {
          this.end = new Date().getMilliseconds();
          const duration = Math.abs(this.start - this.end)

          duration > 150 ? this.removeRouteFromCard(routeLengthPoints, playerScoreCard) : this.addRouteToCard(routeLengthPoints, playerScoreCard);
        }
      }
      
}
