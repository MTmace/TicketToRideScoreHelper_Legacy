import { Component, OnInit } from "@angular/core";
import { ScoringCacheService } from "../services/scoring-cache.service";
import { RouteLengthPointsService } from "../services/route-length-points.services";

@Component({
    selector: "mt-scoring-routes",
    moduleId: module.id,
    templateUrl: "./scoring-routes.component.html",
    styleUrls: ["./scoring-routes.css"]
})

export class ScoringRoutesComponent implements OnInit {

    constructor(private scoringCacheService: ScoringCacheService,
        private routeLengthPointsService: RouteLengthPointsService) {
    }

    ngOnInit(): void {
    }
}
