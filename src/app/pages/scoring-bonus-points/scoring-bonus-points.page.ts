import { Component, OnInit } from "@angular/core";
import { DataService } from "~/app/services/data.service";
import { CacheService } from "~/app/services/cache.service";

@Component({
    selector: "mt-scoring-bonus-points",
    moduleId: module.id,
    templateUrl: "./scoring-bonus-points.page.html",
    styleUrls: ["./scoring-bonus-points.page.css"]
})

export class ScoringBonusPointsPage implements OnInit {

    constructor(private dataService: DataService,
        private cacheService: CacheService) {
    }

    ngOnInit(): void {
    }

}