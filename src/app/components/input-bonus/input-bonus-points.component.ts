import { Component, OnInit, Input } from "@angular/core";
import { BonusPoints } from "~/app/models/bonus-points";

@Component({
    selector: "mt-input-bonus-points",
    moduleId: module.id,
    templateUrl: "./input-bonus-points.component.html",
    styleUrls: ["./input-bonus-points.component.css"]
})

export class InputBonusPointsComponent implements OnInit {

    @Input() bonusPoints: BonusPoints;
    @Input() color: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}