import { Component, OnInit } from "@angular/core";
import { DataService } from "~/app/services/data.service";
import { CacheService } from "~/app/services/cache.service";
import { GameProfile } from "~/app/models/game-profile";
import { Router } from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import { ExpansionDefinition } from "~/app/models/expansion-definition";
import { EventData } from "tns-core-modules/ui/page/page";
import { Button } from "tns-core-modules/ui/button/button";
import { RouterExtensions } from "nativescript-angular/router";

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
    }

    selectGame(selectedGame: GameProfile) {

        this.selectedGame = selectedGame;

        if(this.cacheService.gameProfile.name != selectedGame.name && this.cacheService.playerScoreCards.length > 0) {
            this.displayConfirmDialog();
        } else {
            this.changeGame();
        }
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
        this.selectedGame = null;
        this.router.navigate(["/"]);
    }

    onCheckedChange(args: EventData, gameProfile: GameProfile, expansionDefinition: ExpansionDefinition) {

        let myButton = args.object as Button;

        // Check to see if the expansion is already added to the selected Game Profile
        var foundBonusPointsDefinition = this.cacheService.gameProfile.bonusPointsDefinitions.find(item => item.name === expansionDefinition.bonusPointsDefinitions[0].name);

        if (foundBonusPointsDefinition && myButton.text === '-') {
            // Expansion found and needs to be removed
            this.cacheService.gameProfile.bonusPointsDefinitions = this.cacheService.gameProfile.bonusPointsDefinitions.filter(obj => obj !== foundBonusPointsDefinition);
            this.cacheService.playerScoreCards.forEach(playingCard => {
                playingCard.bonusPointsCount.filter(obj => obj != foundBonusPointsDefinition);
            });

        } else if (!foundBonusPointsDefinition && myButton.text === '+') {
            expansionDefinition.bonusPointsDefinitions.forEach(bpd => {
                this.cacheService.gameProfile.bonusPointsDefinitions.push(bpd);

                this.cacheService.playerScoreCards.forEach(playingCard => {
                    playingCard.bonusPointsCount.push(bpd);
                });
            });
        }

    }

    public expansionSelected(expansionDefinition: ExpansionDefinition) : string {
        const expansionSelected = this.cacheService.gameProfile.bonusPointsDefinitions.some(i => i.name === expansionDefinition.bonusPointsDefinitions[0].name);
        return expansionSelected ? '-' : '+';
    }

    public navigateToAbout() {
        this._routerExtensions.navigate(["/about"]);
    }
}
