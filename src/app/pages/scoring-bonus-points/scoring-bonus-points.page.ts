import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { DataService } from "~/app/services/data.service";
import { CacheService } from "~/app/services/cache.service";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "mt-scoring-bonus-points",
    moduleId: module.id,
    templateUrl: "./scoring-bonus-points.page.html",
    styleUrls: ["./scoring-bonus-points.page.css"]
})

export class ScoringBonusPointsPage implements OnInit {
    constructor(private dataService: DataService,
        public cacheService: CacheService,
        private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    public drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
    }

}
