import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  firstValueFrom,
  Observable,
  switchMap
} from 'rxjs';

import {
  Card,
  Game,
  GameWithEvents,
  PlayerWithStats,
  ShotOnGoal
} from './api-types';
import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation
} from './api-urls';
import { gamePageActions } from './state/actions';
import {
  selectCardsForGame,
  selectGame,
  selectGamesState,
  selectGameWithDetails,
  selectPlayerWithDetails,
  selectShotsForGame
} from './state/selectors';

@Injectable()
export class GameService {
  readonly games = this.store.select(selectGamesState);
  constructor(private store: Store, private http: HttpClient) {}

  getGame(id: string) {
    return this.store.select(selectGame(id));
  }

  getShotsForGame(id: string) {
    return this.store.select(selectShotsForGame(id));
  }

  getCardsForGame(id: string) {
    return this.store.select(selectCardsForGame(id));
  }

  getPlayerDetails(ids: string[]): Observable<PlayerWithStats[]> {
    return combineLatest(
      ids.map(id => this.store.select(selectPlayerWithDetails(id)))
    );
  }

  getGameWithDetails(id: string): Observable<GameWithEvents> {
    return this.store.select(selectGameWithDetails(id));
  }

  async addGame(location: string, date: string, name: string) {
    const game = await firstValueFrom(
      this.http.post<Game>(gameEndpointLocation, {
        name,
        date,
        location,
        players: []
      })
    );
    this.store.dispatch(gamePageActions.addGame({ game }));
  }

  async addPlayerToGame(gameId: string, playerId: string) {
    const game = await firstValueFrom(
      this.getGame(gameId).pipe(
        switchMap(g =>
          this.http.put<Game>(`${gameEndpointLocation}/${gameId}`, {
            ...g,
            players: [...(g ? g.players : []), playerId]
          })
        )
      )
    );
    this.store.dispatch(gamePageActions.updateGame({ game }));
  }

  async addShotToGame(shot: Partial<ShotOnGoal>) {
    const s = await firstValueFrom(
      this.http.post<ShotOnGoal>(goalEndpointLocation, shot)
    );
    this.store.dispatch(gamePageActions.addShot({ shot: s }));
  }

  async deleteGame(id: string) {
    await firstValueFrom(
      this.http.delete(`${gameEndpointLocation}/${id}`)
    );
    this.store.dispatch(gamePageActions.deleteGame({ id }));
  }

  async addCardToGame(newCard: Partial<Card>) {
    const card = await firstValueFrom(
      this.http.post<Card>(cardEndpointLocation, newCard)
    );
    this.store.dispatch(gamePageActions.addCard({ card }));
  }
}
