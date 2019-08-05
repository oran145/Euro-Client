import { Action } from "@ngrx/store";
import { User } from "src/app/shared/user.model";
import { Tournament } from "src/app/shared/tournament.model";
import { UsersPredictions } from "src/app/shared/users-predictions.model";
import { Game } from "src/app/shared/game.model";
import { ScoreTable } from "src/app/shared/score-table.model";
import { UserTournament } from "src/app/shared/user-tournament.model";

export const CREATE_TOURNAMENT = "[Tournament] Create Tournament";
export const ERROR_ACTION = "[Tournament] Error Action";
export const JOIN_TOURNAMENT = "[Tournament] Join Tournament";
export const JOIN_TOURNAMENT_SUCCESS = "[Touranament] Join Touranment Success";
export const UPDATE_TOURNAMENT = "[Tournament] Update Tournament";
export const GET_USER_TOURNAMENTS = "[Tournament] Get User Tournaments";
export const SET_USER_TOURNAMENTS = "[Tournament] Set User Tournaments";
export const CLEAR_ERROR = "[Tournament] Clear Error";
export const GET__USERS_PREDICTIONS = "[Tournament] Get Users Predictions";
export const SET_SCORE_TABLE = "[Tournament] Set Score Table";
export const GET_TOURNAMENT_DATA = "[Tournament] Get Tournament Data";
export const GET_TOURNAMENT_DATA_SUCCESS =
  "[Tournament] Get Tournament Data Success";
export const GET_GAMES_AND_PREDICTIONS =
  "[Tournament] Get Games And Predictions";
export const SET_GAMES_AND_PREDICTIONS =
  "[Tournament] Set Games And Predictions";
export const GET_SCORE_TABLE = "[Tournament] Get Score Table";
export const SAVE_USER_PREDICTIONS = "[Tournament] Save User Predictions";

export class CreateTournament implements Action {
  readonly type = CREATE_TOURNAMENT;

  constructor(public payload: { tournament: Tournament; user: User }) {}
}
export class ErrorAction implements Action {
  readonly type = ERROR_ACTION;

  constructor(public payload: string) {}
}

export class UpdateTournament implements Action {
  readonly type = UPDATE_TOURNAMENT;

  constructor(
    public payload: { tournamentId: string; tournament: Tournament }
  ) {}
}

export class JoinTournament implements Action {
  readonly type = JOIN_TOURNAMENT;

  constructor(public payload: { tournamentId: string; user: User }) {}
}

export class JoinTournamentSuccess implements Action {
  readonly type = JOIN_TOURNAMENT_SUCCESS;
}

export class GetUserTournaments implements Action {
  readonly type = GET_USER_TOURNAMENTS;

  constructor(public payload: string) {}
}

export class SetUserTournaments implements Action {
  readonly type = SET_USER_TOURNAMENTS;

  constructor(public payload: UserTournament[]) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class GetUserPredictions implements Action {
  readonly type = GET__USERS_PREDICTIONS;

  constructor(
    public payload: { games: Game[]; userEmail: string; tournamentId: string }
  ) {}
}

export class SetScoreTable implements Action {
  readonly type = SET_SCORE_TABLE;

  constructor(public payload: ScoreTable[]) {}
}

export class GetTournamentData implements Action {
  readonly type = GET_TOURNAMENT_DATA;

  constructor(public payload: string) {}
}

export class GetTournamentDataSuccess implements Action {
  readonly type = GET_TOURNAMENT_DATA_SUCCESS;

  constructor(public payload: Tournament) {}
}
export class GetGamesAndPredictions implements Action {
  readonly type = GET_GAMES_AND_PREDICTIONS;

  constructor(public payload: { userEmail: string; tournamentId: string }) {}
}

export class SetGamesAndPredictions implements Action {
  readonly type = SET_GAMES_AND_PREDICTIONS;

  constructor(
    public payload: { games: Game[]; userPredictions: UsersPredictions }
  ) {}
}

export class GetScoreTable implements Action {
  readonly type = GET_SCORE_TABLE;

  constructor(public payload: string) {}
}
export class SaveUserPredictions implements Action {
  readonly type = SAVE_USER_PREDICTIONS;

  constructor(public payload: UsersPredictions) {}
}

export type TournamentActions =
  | CreateTournament
  | JoinTournament
  | UpdateTournament
  | ErrorAction
  | JoinTournamentSuccess
  | GetUserTournaments
  | SetUserTournaments
  | ClearError
  | GetUserPredictions
  | SetScoreTable
  | GetTournamentData
  | GetTournamentDataSuccess
  | GetGamesAndPredictions
  | SetGamesAndPredictions
  | GetScoreTable
  | SaveUserPredictions;
