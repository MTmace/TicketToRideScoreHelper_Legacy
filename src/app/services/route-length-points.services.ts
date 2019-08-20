import { Injectable } from "@angular/core";
import { RouteLengthPoints } from "../models/route-length-points";

@Injectable({
    providedIn: "root"
})

export class RouteLengthPointsService {
    private routesPoints = new Array<RouteLengthPoints>(
        { length: 1, points: 1 },
        { length: 2, points: 2 },
        { length: 3, points: 4 },
        { length: 4, points: 7 },
        { length: 5, points: 10 },
        { length: 6, points: 15 }
    );

    getRouteLengthPointsList(): Array<RouteLengthPoints> {
        return this.routesPoints;
    }

    getRouteLengthPoints(trainLength: number): RouteLengthPoints {
        return this.routesPoints.filter((routePoints) => routePoints.length === trainLength)[0];
    }
}
