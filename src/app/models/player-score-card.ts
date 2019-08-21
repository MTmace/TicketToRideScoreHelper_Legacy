import { PlayerColor } from "./player-color";
import { RouteLengthPoints } from "./route-length-points";
import { BonusPoints } from "./bonus-points";

export interface PlayerScoreCard {
    playerColor: PlayerColor;
    routeCounts: Array<[number, RouteLengthPoints]>;
    bonusPoints: Array<BonusPoints>
}