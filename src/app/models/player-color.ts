export interface PlayerColor {
    name: string;
    color: string;
    backgroundColor: string;
}

export interface PlayerColorVM extends PlayerColor {
    isEnabled: boolean;
    isWinner: boolean;
}