import { Action } from "@ngrx/store";

export const LOGIN_WITH_FACEBOOK = "[Auth] Login With Facebook";
export const LOGIN_WITH_GOOGLE = "[Auth] Login With Google";
export const REGISTER = "[Auth] Register";
export const LOGIN_WITH_EMAIL_AND_PASSWORD =
  "[Auth] Login With User And Password";
export const REGISTER_SUCCESS = "[Auth] Register Success";
export const AUTHENTICATE_SUCCESS = "[Auth] Authenticate Success";
export const AUTHENTICATE_FAILED = "[Auth] Authenticate Failed";
export const CLEAR_ERROR = "[Auth] Clear Error";

export class LoginWithFacebook implements Action {
  readonly type = LOGIN_WITH_FACEBOOK;
}

export class LoginWithGoogle implements Action {
  readonly type = LOGIN_WITH_GOOGLE;
}
export class LoginWithUserAndPassword implements Action {
  readonly type = LOGIN_WITH_EMAIL_AND_PASSWORD;

  constructor(public payload: { email: string; password: string }) {}
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(
    public payload: { email: string; password: string; displayName: string }
  ) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
}
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: { displayName: string; email: string; imagePath: string }
  ) {}
}

export class AuthenticateFailed implements Action {
  readonly type = AUTHENTICATE_FAILED;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | LoginWithFacebook
  | AuthenticateSuccess
  | AuthenticateFailed
  | LoginWithGoogle
  | LoginWithUserAndPassword
  | ClearError;
