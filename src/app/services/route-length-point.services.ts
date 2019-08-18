import { Injectable } from "@angular/core";
import { RouteLengthPoints } from "../models/route-length-points";

@Injectable({
    providedIn: "root"
})

export class RouteLengthPointService {
    private routesPoints = new Array<RouteLengthPoints>(
        { trainLength: 1, points: 1 },
        { trainLength: 2, points: 2 },
        { trainLength: 3, points: 4 },
        { trainLength: 4, points: 7 },
        { trainLength: 5, points: 10 },
        { trainLength: 6, points: 15 }
    );

    getItems(): Array<RouteLengthPoints> {
        return this.routesPoints;
    }

    getItem(trainLength: number): RouteLengthPoints {
        return this.routesPoints.filter((routePoints) => routePoints.trainLength === trainLength)[0];
    }
}
