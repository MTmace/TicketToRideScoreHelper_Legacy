import { Component, OnInit, Input } from "@angular/core";
import { BonusPoints } from "~/app/models/bonus-points";
import { EventData } from "tns-core-modules/data/observable"
import { Switch } from "tns-core-modules/ui/switch";
import { TextField } from "tns-core-modules/ui/text-field";
import { PlayerScoreCard } from "~/app/models/player-score-card";
import { NumberSymbol } from "@angular/common";

@Component({
    selector: "mt-input-bonus-points",
    moduleId: module.id,
    templateUrl: "./input-bonus-points.component.html",
    styleUrls: ["./input-bonus-points.component.css"]
})

export class InputBonusPointsComponent implements OnInit {
    @Input() bonusPoints: BonusPoints;
    @Input() playerScoreCard: PlayerScoreCard;

    playerBonusPoints: BonusPoints;

    constructor() {
    }

    ngOnInit(): void {
        this.playerBonusPoints = this.playerScoreCard.bonusPoints.find(bonusPoints => bonusPoints.name === this.bonusPoints.name)

        // add a bonus point object if no point value was given
        if (!this.playerBonusPoints && !this.bonusPoints.points) {
            this.playerScoreCard.bonusPoints.push(<BonusPoints> {
                description: this.bonusPoints.description,
                points: 0,
                name: this.bonusPoints.name
            });
        }
    }

    onCheckedChange(args: EventData) {

        let mySwitch = args.object as Switch;
        
        this.playerBonusPoints = this.playerScoreCard.bonusPoints.find(bonusPoints => bonusPoints.name === this.bonusPoints.name);
        
        if (mySwitch.checked && !this.playerBonusPoints) {
            // add points from selected bonus points
            this.playerScoreCard.bonusPoints.push(<BonusPoints> {
                description: this.bonusPoints.description,
                points: this.bonusPoints.points,
                name: this.bonusPoints.name
            });

        } else { 
            if (!mySwitch.checked && this.playerBonusPoints) {
                const playerScoreCardBonusPointsIndex = this.playerScoreCard.bonusPoints.findIndex(bonusPoints => bonusPoints.name === this.bonusPoints.name);

                // remove the selected bonus points
                const v = this.playerScoreCard.bonusPoints.splice(playerScoreCardBonusPointsIndex, 1);
            }
        }
        
    }

}