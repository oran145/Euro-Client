import * as fromAuth from "../login/store/auth.reducer";
import * as fromTournament from "../tournament/store/tournament.reucer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  auth: fromAuth.State;
  tournament: fromTournament.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  tournament: fromTournament.tournamentReducer
};
