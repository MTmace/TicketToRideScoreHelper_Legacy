import { Component, OnInit } from "@angular/core";
import { CacheService } from "~/app/services/cache.service";
import { PlayerColorVM } from "~/app/models/player-color";

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

export class OutcomePage implements OnInit {

    scores: KeyValue<PlayerColorVM, number>[] = [];

    constructor(private cacheService: CacheService) {
    }

    ngOnInit(): void {
        this.cacheService.playerScoreCards.forEach(scoreCard => {
            this.scores.push(<KeyValue<PlayerColorVM, number>> {
                key: scoreCard.playerColor,
                value: this.cacheService.getTotalScore(scoreCard)
            });
        })

        this.scores = this.scores.sort((a, b) => (b.value - a.value));

        this.scores.forEach(score => {score.key.isWinner = this.scores[0].value === score.value});
    }

}