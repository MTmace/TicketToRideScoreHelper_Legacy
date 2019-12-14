import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { BehaviorSubject } from "rxjs";

import { PlayerColor } from "../../models/player-color";
import { CacheService } from "../../services/cache.service";
import { GameProfile } from "~/app/models/game-profile";
import { PlayerScoreCard } from "../../models/player-score-card";

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.page.html",
    styleUrls: ["./select-players.page.css"]
})

export class SelectPlayersPage implements AfterViewInit, OnInit {
    constructor(public cacheService: CacheService,
        private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    public drawer: RadSideDrawer;
    public gameProfile$: BehaviorSubject<GameProfile>;

    ngOnInit() {
        // Create a local behavior subject from the gameprofile observable in the cache service
        this.cacheService.gameProfile$.subscribe((gameProfile: GameProfile) => this.gameProfile$ = new BehaviorSubject(gameProfile));
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
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
