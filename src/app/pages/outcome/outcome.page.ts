import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { CacheService } from "~/app/services/cache.service";
import { PlayerColorVM } from "~/app/models/player-color";
import { Router } from "@angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { PlayerScoreCard } from "~/app/models/player-score-card";

interface KeyValue<K, V> {
    key: K
    value: V
  }

@Component({
    selector: "mt-outcome",
    moduleId: module.id,
    templateUrl: "./outcome.page.html",
    styleUrls: ["./outcome.page.css"]
})

export class OutcomePage implements AfterViewInit, OnInit {
    scores: KeyValue<PlayerColorVM, number>[] = [];
    playerScoreCards: Array<PlayerScoreCard>;

    constructor(public cacheService: CacheService,
        private router: Router,
        private _changeDetectionRef: ChangeDetectorRef) {

            this.cacheService.playerScoreCards$.subscribe(scoreCards => this.playerScoreCards = scoreCards);

    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    public drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        this.playerScoreCards.forEach(scoreCard => {
            this.scores.push(<KeyValue<PlayerColorVM, number>> {
                key: scoreCard.playerColor,
                value: this.cacheService.getTotalScore(scoreCard)
            });
        })

        this.scores = this.scores.sort((a, b) => (b.value - a.value));

        this.scores.forEach(score => {score.key.isWinner = this.scores[0].value === score.value});
    }

    newGame() {
        this.cacheService.newGame();
        this.router.navigate(["/"]);
    }
}
