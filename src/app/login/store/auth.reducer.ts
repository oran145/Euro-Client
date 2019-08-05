import * as AuthActions from "./auth.actions";
import { User } from "src/app/shared/user.model";

export interface State {
  authError: string;
  loading: boolean;
  user: User;
}

const initialState: State = {
  authError: null,
  loading: false,
  user: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null
      };
    case AuthActions.AUTHENTICATE_FAILED:
      return {
        ...state,
        user: null,
        authError: action.payload
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
