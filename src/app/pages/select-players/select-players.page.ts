import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { PlayerColor } from "../../models/player-color";
import { CacheService } from "../../services/cache.service";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.page.html",
    styleUrls: ["./select-players.page.css"]
})

export class SelectPlayersPage implements AfterViewInit, OnInit {
    constructor(private dataService: DataService,
        private cacheService: CacheService,
        private _changeDetectionRef: ChangeDetectorRef) { 
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        // Set default game to the 1st game profile
        this.cacheService.gameProfile = this.cacheService.gameProfile || this.dataService.getGameProfiles()[0];
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor) {
        const foundIndex = this.cacheService.playerScoreCards.findIndex(x => x.playerColor.name === selectedPlayerColor.name);
        // Create a scorecard if one is not found, remove the card if it does
        foundIndex === -1 ? this.cacheService.createScoreCard(selectedPlayerColor) : this.cacheService.removeScoreCard(foundIndex);
    }

    isEnabled(selectedPlayerColor: string) : boolean {
        return !this.cacheService.playerScoreCards.some(x => x.playerColor.name === selectedPlayerColor);
    }
}