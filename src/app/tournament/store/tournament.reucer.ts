import * as TournamentActions from "../store/tournament.actions";
import { Tournament } from "src/app/shared/tournament.model";
import { UsersPredictions } from "src/app/shared/users-predictions.model";
import { Game } from "src/app/shared/game.model";
import { ScoreTable } from "src/app/shared/score-table.model";
import { UserTournament } from "src/app/shared/user-tournament.model";

export interface State {
  tournamentError: string;
  userTournaments: UserTournament[];
  tournamentData: Tournament;
  userPredictions: UsersPredictions;
  games: Game[];
  scoreTable: ScoreTable[];
  loading: boolean;
}

const initialState: State = {
  tournamentError: null,
  userTournaments: [],
  tournamentData: null,
  userPredictions: null,
  games: null,
  scoreTable: null,
  loading: false
};

export function tournamentReducer(
  state = initialState,
  action: TournamentActions.TournamentActions
) {
  switch (action.type) {
    case TournamentActions.ERROR_ACTION:
      return {
        ...state,
        tournamentError: action.payload
      };
    case TournamentActions.SET_USER_TOURNAMENTS:
      return {
        ...state,
        userTournaments: action.payload
      };
    case TournamentActions.CLEAR_ERROR:
      return {
        ...state,
        tournamentError: null
      };
    case TournamentActions.GET_SCORE_TABLE:
    case TournamentActions.GET_GAMES_AND_PREDICTIONS:
      return {
        ...state,
        loading: true
      };
    case TournamentActions.SET_SCORE_TABLE:
      return {
        ...state,
        scoreTable: action.payload,
        loading: false
      };
    case TournamentActions.GET_TOURNAMENT_DATA_SUCCESS:
      return {
        ...state,
        tournamentData: action.payload
      };
    case TournamentActions.SET_GAMES_AND_PREDICTIONS:
      return {
        ...state,
        userPredictions: action.payload.userPredictions,
        games: action.payload.games,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
}
