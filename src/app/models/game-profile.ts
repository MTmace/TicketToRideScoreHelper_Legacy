import { RouteLengthPointsDefinition } from "./route-length-points-definition";
import { BonusPointsDefinition } from "./bonus-points-definition";
import { PlayerColor } from "./player-color";
import { ExpansionDefinition } from "./expansion-definition";

export interface GameProfile {
    name: string;
    playerColors: Array<PlayerColor>;
    routeLengthPointsDefinitions: Array<RouteLengthPointsDefinition>;
    bonusPointsDefinitions: Array<BonusPointsDefinition>;
    description?: string;
    expansionDefinitions?: Array<ExpansionDefinition>;
}