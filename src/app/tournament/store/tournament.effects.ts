import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";

import * as TournamentActions from "./tournament.actions";
import { HttpClient } from "@angular/common/http";
import { of, pipe } from "rxjs";
import { UsersPredictions } from "src/app/shared/users-predictions.model";
import { Tournament } from "src/app/shared/tournament.model";
import { Game } from "src/app/shared/game.model";
import { ScoreTable } from "src/app/shared/score-table.model";
import { UserTournament } from "src/app/shared/user-tournament.model";

@Injectable()
export class TournamentEffects {
  @Effect()
  createTournament = this.actions$.pipe(
    ofType(TournamentActions.CREATE_TOURNAMENT),
    switchMap((tournamentData: TournamentActions.CreateTournament) => {
      return this.http
        .post<Tournament>(
          "http://localhost:3000/tournaments/createTournament",
          tournamentData.payload.tournament
        )
        .pipe(
          map(res => {
            return new TournamentActions.JoinTournament({
              tournamentId: res["_id"],
              user: tournamentData.payload.user
            });
          }),
          catchError(err => {
            return of(
              new TournamentActions.ErrorAction(
                "An error occurred when trying to create a tournament!"
              )
            );
          })
        );
    })
  );

  @Effect({ dispatch: false })
  updateTournament = this.actions$.pipe(
    ofType(TournamentActions.UPDATE_TOURNAMENT),
    switchMap((tournamentData: TournamentActions.UpdateTournament) => {
      return this.http.put(
        "https://euro-projet.firebaseio.com/tournaments/" +
          tournamentData.payload.tournamentId +
          ".json",
        tournamentData.payload.tournament
      );
    })
  );

  @Effect()
  joinTournament = this.actions$.pipe(
    ofType(TournamentActions.JOIN_TOURNAMENT),
    switchMap((tournamentData: TournamentActions.JoinTournament) => {
      return this.http
        .post(
          "http://localhost:3000/tournaments/joinTournament",
          tournamentData.payload
        )
        .pipe(
          map(res => {
            return new TournamentActions.JoinTournamentSuccess();
          }),
          catchError(err => {
            return of(
              new TournamentActions.ErrorAction(
                "An error occurred when trying to join tournament!"
              )
            );
          })
        );
    })
  );
  @Effect()
  getUserTournaments = this.actions$.pipe(
    ofType(TournamentActions.GET_USER_TOURNAMENTS),
    switchMap((userEmail: TournamentActions.GetUserTournaments) => {
      return this.http
        .get<UserTournament[]>(
          "http://localhost:3000/users/getUserTournaments/" + userEmail.payload
        )
        .pipe(
          map(res => {
            return new TournamentActions.SetUserTournaments(res);
          }),
          catchError(err => {
            if (err.status === 404) {
              return of(new TournamentActions.SetUserTournaments([]));
            }
            // return of(new TournamentActions.ErrorAction("err"));
          })
        );
    })
  );

  @Effect()
  getAllGames = this.actions$.pipe(
    ofType(TournamentActions.GET_GAMES_AND_PREDICTIONS),
    switchMap((tournametState: TournamentActions.GetGamesAndPredictions) => {
      return this.http
        .get<Game[]>("http://localhost:3000/games/getAllGames")
        .pipe(
          map(res => {
            const gamesWithoutPreditions = {
              games: res,
              userEmail: tournametState.payload.userEmail,
              tournamentId: tournametState.payload.tournamentId
            };
            return new TournamentActions.GetUserPredictions(
              gamesWithoutPreditions
            );
          }),
          catchError(err => {
            return of(new TournamentActions.ErrorAction(err.message));
          })
        );
    })
  );

  @Effect()
  getUserPredictions = this.actions$.pipe(
    ofType(TournamentActions.GET__USERS_PREDICTIONS),
    switchMap((tournamentState: TournamentActions.GetUserPredictions) => {
      return this.http
        .get<UsersPredictions>(
          "http://localhost:3000/users/getUserPredictions/" +
            tournamentState.payload.tournamentId +
            "/" +
            tournamentState.payload.userEmail
        )
        .pipe(
          map(res => {
            return new TournamentActions.SetGamesAndPredictions({
              games: tournamentState.payload.games,
              userPredictions: res
            });
          }),
          catchError(err => {
            return of(new TournamentActions.ErrorAction(err.message));
          })
        );
    })
  );

  @Effect()
  getTournamentData = this.actions$.pipe(
    ofType(TournamentActions.GET_TOURNAMENT_DATA),
    switchMap((tournamentId: TournamentActions.GetTournamentData) => {
      return this.http
        .get<Tournament>(
          "http://localhost:3000/tournaments/getTournament/" +
            tournamentId.payload
        )
        .pipe(
          map(res => {
            return new TournamentActions.GetTournamentDataSuccess(res);
          }),
          catchError(err => {
            return of(new TournamentActions.ErrorAction(err.message));
          })
        );
    })
  );
  @Effect()
  getScoreTable = this.actions$.pipe(
    ofType(TournamentActions.GET_SCORE_TABLE),
    switchMap((tournamentId: TournamentActions.GetScoreTable) => {
      return this.http
        .get<ScoreTable[]>(
          "http://localhost:3000/tournaments/getScoreTable/" +
            tournamentId.payload
        )
        .pipe(
          map(res => {
            return new TournamentActions.SetScoreTable(res);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  saveUserPredictions = this.actions$.pipe(
    ofType(TournamentActions.SAVE_USER_PREDICTIONS),
    switchMap((tournamentState: TournamentActions.SaveUserPredictions) => {
      return this.http.post(
        "http://localhost:3000/users/saveUserPredcitions/" +
          tournamentState.payload.tournamentId +
          "/" +
          tournamentState.payload.userEmail,
        tournamentState.payload.gamesPredictions
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
