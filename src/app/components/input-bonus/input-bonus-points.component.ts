import { Component, OnInit, Input } from "@angular/core";
import { BonusPointsDefinition } from "~/app/models/bonus-points-definition";
import { EventData } from "tns-core-modules/data/observable"
import { Switch } from "tns-core-modules/ui/switch";
import { TextField } from "tns-core-modules/ui/text-field";
import { PlayerScoreCard } from "~/app/models/player-score-card";

@Component({
    selector: "mt-input-bonus-points",
    moduleId: module.id,
    templateUrl: "./input-bonus-points.component.html",
    styleUrls: ["./input-bonus-points.component.css"]
})

export class InputBonusPointsComponent implements OnInit {
    @Input() bonusPoints: BonusPointsDefinition;
    @Input() playerScoreCard: PlayerScoreCard;

    playerBonusPoints: BonusPointsDefinition;
    initialPoints: number;

    constructor() {
    }

    ngOnInit(): void {
        this.playerBonusPoints = this.playerScoreCard.bonusPointsCount.find(bonusPoints => bonusPoints.name === this.bonusPoints.name)

        if (!this.bonusPoints.points) {
            this.initialPoints = this.playerBonusPoints.points;
        }
    }

    onCheckedChange(args: EventData) {
        let mySwitch = args.object as Switch;
        
        if (mySwitch.checked) {
            this.playerBonusPoints.points = this.bonusPoints.points;
        } else { 
            this.playerBonusPoints.points = 0;
        }
    }

    public onTextChange(args) {
        let textField = args.object as TextField;

        console.log("onTextChange");

        this.playerBonusPoints.points = +textField.text;
    }

}