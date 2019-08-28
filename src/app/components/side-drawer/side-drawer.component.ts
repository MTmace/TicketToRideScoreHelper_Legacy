import { Component } from "@angular/core";
import { DataService } from "~/app/services/data.service";
import { CacheService } from "~/app/services/cache.service";
import { GameProfile } from "~/app/models/game-profile";
import { Router } from "@angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "mt-side-drawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})

export class SideDrawerComponent {

    selectedGame: GameProfile;

    constructor(private dataService: DataService,
        private cacheService: CacheService,
        private router: Router) {
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
            message: "You have a game in progress, gaming the type of game will erase the current one.",
            okButtonText: "OK",
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
}