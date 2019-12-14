import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import { ExpansionDefinition } from "~/app/models/expansion-definition";
import { EventData } from "tns-core-modules/ui/page/page";
import { Button } from "tns-core-modules/ui/button/button";
import { RouterExtensions } from "nativescript-angular/router";
import { BehaviorSubject } from "rxjs";

import { DataService } from "~/app/services/data.service";
import { CacheService } from "~/app/services/cache.service";
import { GameProfile } from "~/app/models/game-profile";

@Component({
    selector: "mt-side-drawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})

export class SideDrawerComponent {

    selectedGame: GameProfile;

    constructor(public dataService: DataService,
        public cacheService: CacheService,
        private router: Router,
        private _routerExtensions: RouterExtensions) {

            // Subscribe to the game profile defined in the cache service, that is the selected game
            this.cacheService.gameProfile$.subscribe((selectedGame: GameProfile) => this.selectedGame = selectedGame);
    }

    selectGame(changedGame: GameProfile) {

        if(this.selectedGame.name != changedGame.name && this.cacheService.playerScoreCards.length > 0) {
            this.displayConfirmDialog();
        } else {
            this.changeGame();
        }

        // Change the selected game in the cache
        this.cacheService.changeGame(changedGame);
    }

    displayConfirmDialog() {
        // >> confirm-dialog-code
        let options = {
            title: "Game in Progress",
            message: "You have a game in progress, would you like to start a new game?",
            okButtonText: "YES",
            cancelButtonText: "Cancel",
        };

        confirm(options).then((result: boolean) => {
            if (result) {
                this.changeGame();
            }
        });
    }

    changeGame(){
        // Clear game if one exists and change Game Profile
        this.cacheService.changeGame(this.selectedGame);
        this.router.navigate(["/"]);
    }

    onCheckedChange(args: EventData, gameProfile: GameProfile, expansionDefinition: ExpansionDefinition) {

        let myButton = args.object as Button;

        // Check to see if the expansion is already added to the selected Game Profile
        var foundBonusPointsDefinition = this.selectedGame.bonusPointsDefinitions.find(item => item.name === expansionDefinition.bonusPointsDefinitions[0].name);

        if (foundBonusPointsDefinition && myButton.text === '-') {
            // Expansion found and needs to be removed
            this.selectedGame.bonusPointsDefinitions = this.selectedGame.bonusPointsDefinitions.filter(obj => obj !== foundBonusPointsDefinition);
            this.cacheService.playerScoreCards.forEach(playingCard => {
                playingCard.bonusPointsCount.filter(obj => obj != foundBonusPointsDefinition);
            });

        } else if (!foundBonusPointsDefinition && myButton.text === '+') {
            expansionDefinition.bonusPointsDefinitions.forEach(bpd => {
                this.selectedGame.bonusPointsDefinitions.push(bpd);

                // Need to update the game in the cache
                this.cacheService.changeGame(this.selectedGame);

                this.cacheService.playerScoreCards.forEach(playingCard => {
                    playingCard.bonusPointsCount.push(bpd);
                });
            });
        }

    }

    public expansionSelected(expansionDefinition: ExpansionDefinition) : string {
        const expansionSelected = this.selectedGame.bonusPointsDefinitions.some(i => i.name === expansionDefinition.bonusPointsDefinitions[0].name);
        return expansionSelected ? '-' : '+';
    }

    public navigateToAbout() {
        this._routerExtensions.navigate(["/about"]);
    }
}
