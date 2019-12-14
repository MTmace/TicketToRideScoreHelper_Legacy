import { Injectable } from "@angular/core";
import { PlayerScoreCard } from "../models/player-score-card";
import { GameProfile} from "../models/game-profile";
import { PlayerColor } from "../models/player-color";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BonusPointsDefinition } from "../models/bonus-points-definition";
import { DataService } from "./data.service";

@Injectable({
    providedIn: "root"
})

export class CacheService {

    private _gameProfile$: BehaviorSubject<GameProfile>;
    public gameProfile$: Observable<GameProfile>;

    playerScoreCards: Array<PlayerScoreCard> = [];

    constructor(private dataService: DataService)
    {
        // Create the gameProfile subject with first game profile defined in the data service
        this.dataService.gameProfiles.pipe(
            map((gameProfiles: Array<GameProfile>) => gameProfiles[0])
        ).subscribe((gameProfile: GameProfile) => {
            this._gameProfile$ = new BehaviorSubject(gameProfile);
            this.gameProfile$ = this._gameProfile$.asObservable();
        });
    }

    public getRouteCountScore(playerScoreCard: PlayerScoreCard): number {
        if (!playerScoreCard.routeLengthPointsCount) { return 0; }

        var total = 0;

        playerScoreCard.routeLengthPointsCount.forEach(routeCount => {
            total = total + (routeCount[0]* routeCount[1].points);
        });

        return total;
    }

    public getTotalScore(playerScoreCard: PlayerScoreCard) : number {
        var total = this.getRouteCountScore(playerScoreCard);

        playerScoreCard.bonusPointsCount.forEach(b => {
            total = total + b.points;
        });

        return total;
    }

    public removeScoreCard(scoreCardIndex: number): void {
        this.playerScoreCards.splice(scoreCardIndex, 1)
    }

    public createScoreCard(playerColor: PlayerColor): PlayerScoreCard {
        var playerScoreCard = <PlayerScoreCard>({
            playerColor: playerColor,
            routeLengthPointsCount: [],
            bonusPointsCount: []
          });

        this._gameProfile$.pipe(
            map((profile: GameProfile) => profile.bonusPointsDefinitions)
        ).subscribe((bonusPoints: Array<BonusPointsDefinition>) => {

            bonusPoints.forEach(bonusPoint => {
                playerScoreCard.bonusPointsCount.push({
                    name: bonusPoint.name,
                    points: 0,
                    bonusPointsBehavior: bonusPoint.bonusPointsBehavior,
                    description: bonusPoint.description
                })
            });

            this.playerScoreCards.push(playerScoreCard);
        });

        return playerScoreCard;
    }

    public changeGame(newGameProfile: GameProfile) {
        this._gameProfile$.next(newGameProfile);
        this.playerScoreCards = [];
    }

}
