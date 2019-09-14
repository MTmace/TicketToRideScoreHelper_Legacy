import { Component, Input } from "@angular/core";
import { GameProfile } from "~/app/models/game-profile";

@Component({
    selector: "mt-game-profile-definition",
    moduleId: module.id,
    templateUrl: "./game-profile-definition.component.html",
    styleUrls: ["./game-profile-definition.component.css"]
})

export class GameProfileDefinitionComponent {
    @Input() gameProfile: GameProfile;
    @Input() isEven: boolean;

    constructor() {
    }

    public hasProp(o, name) {
        return o.hasOwnProperty(name);
    }
}
