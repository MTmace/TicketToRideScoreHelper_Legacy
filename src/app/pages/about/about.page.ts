import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { CacheService } from "~/app/services/cache.service";
import { DataService } from "~/app/services/data.service";
import { Router } from "@angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { GameProfile } from "~/app/models/game-profile";

@Component({
    selector: "mt-about",
    moduleId: module.id,
    templateUrl: "./about.page.html",
    styleUrls: ["./about.page.css"]
})

export class AboutPage implements AfterViewInit, OnInit {

    //public gameProfiles: Array<GameProfile>

    constructor(public dataService: DataService,
        private cacheService: CacheService,
        private router: Router,
        private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    public drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        //this.gameProfiles = this.dataService.getGameProfiles();
    }

    newGame() {
        this.cacheService.newGame();
        this.router.navigate(["/"]);
    }

    public templateSelector(item: GameProfile, index: number, items: any) {
        return index % 2 === 0 ? "even" : "odd";
    }
}
