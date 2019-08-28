import { BonusPointsDefinition } from "./bonus-points-definition";

export interface ExpansionDefinition {
    name: string;
    bonusPointsDefinitions: Array<BonusPointsDefinition>;
    description: string;
}