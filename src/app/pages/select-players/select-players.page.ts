import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { PlayerColor } from "../../models/player-color";
import { PlayerScoreCard } from "../../models/player-score-card";
import { CacheService } from "../../services/cache.service";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as application from "tns-core-modules/application";

@Component({
    selector: "mt-select-players",
    moduleId: module.id,
    templateUrl: "./select-players.page.html",
    styleUrls: ["./select-players.page.css"]
})

export class SelectPlayersPage implements AfterViewInit, OnInit {
    playerColors: Array<PlayerColor>;

    isDrawerOpen = false;
    isNavVisible = false;
    isItemVisible = false;

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
        if (application.ios) {
            this.isNavVisible = false;
            this.isItemVisible = true;
        } else if (application.android) {
            this.isNavVisible = true;
            this.isItemVisible = false;
        }

        this.playerColors = this.dataService.getPlayerColors();
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor) {
        const foundIndex = this.cacheService.playerScoreCards.findIndex(x => x.playerColor.name === selectedPlayerColor.name);
        foundIndex === -1 ? this.cacheService.playerScoreCards.push(this.getNewScoreCard(selectedPlayerColor)) : this.cacheService.playerScoreCards.splice(foundIndex, 1);
    }

    isEnabled(selectedPlayerColor: string) : boolean {
        return !this.cacheService.playerScoreCards.some(x => x.playerColor.name === selectedPlayerColor);
    }

    private getNewScoreCard(playerColor: PlayerColor): PlayerScoreCard {
        const bonusPoints = this.dataService.getBonusPointsDefinitions();

        var playerScoreCard = <PlayerScoreCard>({
          playerColor: playerColor,
          routeLengthPointsCount: [],
          bonusPointsCount: []
        });

        bonusPoints.forEach(bonusPoint => {
            playerScoreCard.bonusPointsCount.push({
                name: bonusPoint.name,
                points: 0,
                description: bonusPoint.description})
            });

        return playerScoreCard;
    }

    public toggleDrawer() {
        this.isDrawerOpen ? this.drawer.closeDrawer() : this.drawer.showDrawer();
        this.isDrawerOpen = !this.isDrawerOpen;
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
        this.isDrawerOpen = false;
    }
}