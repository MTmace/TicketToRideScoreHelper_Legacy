import { PlayerColor } from "./player-color";
import { RouteLengthPointsDefinition } from "./route-length-points-definition";
import { BonusPointsDefinition } from "./bonus-points-definition";

export interface PlayerScoreCard {
    playerColor: PlayerColor;
    routeLengthPointsCount: Array<[number, RouteLengthPointsDefinition]>;
    bonusPointsCount: Array<BonusPointsDefinition>
}
