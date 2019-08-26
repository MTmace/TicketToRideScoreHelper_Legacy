import { Component, OnInit } from "@angular/core";
import { CacheService } from "../../services/cache.service";
import { DataService } from "../../services/data.service";
import { RouteLengthPointsDefinition } from "../../models/route-length-points-definition";
import { PlayerScoreCard } from "../../models/player-score-card";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";

@Component({
    selector: "mt-scoring-routes",
    moduleId: module.id,
    templateUrl: "./scoring-routes.page.html",
    styleUrls: ["./scoring-routes.page.css"]
})

export class ScoringRoutesPage implements OnInit {
    // Tap and long press are both triggered with long press. So we need to handle 1 event 'onTouch'
    // then we determine if the touch event is a tap or long press
    start: number;
    end: number;

    constructor(private cacheService: CacheService,
        private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    // TODO: move to service
    // TODO: add unit testing here
    addRouteToCard(routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard) {
        // check to see if the route has been added to the score card
        var routeCount = playerScoreCard.routeLengthPointsCount.find(x => x[1].length === routeLengthPoints.length);

        if (!routeCount) {
            // not route was found, so add it
            playerScoreCard.routeLengthPointsCount.push([1, routeLengthPoints]);
        } else {
            // TODO: the limit should be per game and not per person. Need to validate limit against all players
            // If the routeCounts have not reached their limits then add it to the ScoreCard
            if (routeCount[0] < routeCount[1].limit) {
                routeCount[0] = routeCount[0] + 1;
            }
        }
    }

    // TODO: move to service
    removeRouteFromCard(routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard) {
        // check to see if the route has been added to the score card
        var routeCount = playerScoreCard.routeLengthPointsCount.find(x => x[1].length === routeLengthPoints.length);

        if (routeCount && routeCount[0] > 0 ) {
            routeCount[0] = routeCount[0] - 1;
        }
    }

    getRouteLengthPoints(routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard): number {
        // check to see if the route has been added to the score card
        const routeCount = playerScoreCard.routeLengthPointsCount.find(x => x[1].length === routeLengthPoints.length);
        var count = 0;

        return routeCount ? routeCount[0] : count;
    }

    onTouch(args: TouchGestureEventData, routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard) {
        if(args.action === "down") {
            this.start = new Date().getMilliseconds();
        }

        if(args.action === "up") {
            this.end = new Date().getMilliseconds();
            const duration = Math.abs(this.start - this.end)

            duration > 200 ? this.removeRouteFromCard(routeLengthPoints, playerScoreCard) : this.addRouteToCard(routeLengthPoints, playerScoreCard);
        }
    }
}