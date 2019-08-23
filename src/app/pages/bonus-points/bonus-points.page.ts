import { Component, OnInit } from "@angular/core";
import { DataService } from "~/app/services/data.service";
import { CacheService } from "~/app/services/cache.service";

@Component({
    selector: "mt-bonus-points",
    moduleId: module.id,
    templateUrl: "./bonus-points.page.html",
    styleUrls: ["./bonus-points.page.css"]
})

export class BonusPointsPage implements OnInit {

    constructor(private dataService: DataService,
        private cacheService: CacheService) {
    }

    ngOnInit(): void {
    }

}