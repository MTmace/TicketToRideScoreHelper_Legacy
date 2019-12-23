import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { PlayerScoreCard } from "../models/player-score-card";
import { GameProfile} from "../models/game-profile";
import { PlayerColor } from "../models/player-color";
import { DataService } from "./data.service";
import { BonusPointsDefinition } from "../models/bonus-points-definition";

@Injectable({
    providedIn: "root"
})

export class CacheService {

    private _gameProfile$: BehaviorSubject<GameProfile>;
    public get gameProfile$(): Observable<GameProfile> {
        return this._gameProfile$.asObservable();
    }

    private _playerScoreCards$: BehaviorSubject<Array<PlayerScoreCard>> = new BehaviorSubject([]);
    public get playerScoreCards$(): Observable<Array<PlayerScoreCard>> {
        return this._playerScoreCards$.asObservable();
    }

    constructor(private dataService: DataService)
    {
        // Create the gameProfile subject with first game profile defined in the data service
        this.dataService.gameProfiles.pipe(
            map((gameProfiles: Array<GameProfile>) => gameProfiles[0])
        ).subscribe((gameProfile: GameProfile) => {
            this._gameProfile$ = new BehaviorSubject(gameProfile);
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

    public changeGame(newGameProfile: GameProfile) {
        this._gameProfile$.next(newGameProfile);
        this._playerScoreCards$.next([]);
    }

    public togglePlayerScoreCard(playerColor: PlayerColor) {
        let scoreCards = this._playerScoreCards$.getValue();

        let scoreCardIndex: number = this._playerScoreCards$.getValue().findIndex(scoreCard => scoreCard.playerColor.name === playerColor.name);

        // If the index is -1 no score card was found so create it.
        // If the index > 0 then score card was found so remove it.
        scoreCardIndex > 0 ? scoreCards.find(scoreCard => scoreCard.playerColor.name === playerColor.name) : this.removeScoreCard(scoreCardIndex);


    }

    private removeScoreCard(scoreCardIndex: number): void {
        this._playerScoreCards$.next(this._playerScoreCards$.getValue().splice(scoreCardIndex, 1))
    }

    private createScoreCard(playerColor: PlayerColor): PlayerScoreCard {
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

            this._playerScoreCards$.getValue().push(playerScoreCard);
            this._playerScoreCards$.next(this._playerScoreCards$.getValue());

        });

        return playerScoreCard;
    }
}
