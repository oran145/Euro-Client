import * as AuthActions from "./auth.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable, NgZone } from "@angular/core";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { of, from } from "rxjs";
import { Router } from "@angular/router";
import { User } from "src/app/shared/user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const handleAuthentication = (
  displayName: string,
  email: string,
  imagePath: string
) => {
  const user = new User(displayName, email, imagePath);
  sessionStorage.setItem("user", JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({ displayName, email, imagePath });
};

const handleError = (err: string) => {
  return of(new AuthActions.AuthenticateFailed(err));
};

@Injectable()
export class AuthEffects {
  @Effect()
  facebookAuth = this.actions$.pipe(
    ofType(AuthActions.LOGIN_WITH_FACEBOOK),
    switchMap((authData: AuthActions.LoginWithFacebook) => {
      return from(
        this._firebaseAuth.auth.signInWithPopup(
          new firebase.auth.FacebookAuthProvider()
        )
      ).pipe(
        map(res => {
          return handleAuthentication(
            res.user.displayName,
            res.user.email,
            res.user.photoURL
          );
        }),
        catchError(err => {
          return handleError("An error occurred when login using Facebook!");
        })
      );
    })
  );

  @Effect()
  googleAuth = this.actions$.pipe(
    ofType(AuthActions.LOGIN_WITH_GOOGLE),
    switchMap((authData: AuthActions.LoginWithGoogle) => {
      return from(
        this._firebaseAuth.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider()
        )
      ).pipe(
        map(res => {
          return handleAuthentication(
            res.user.displayName,
            res.user.email,
            res.user.photoURL
          );
        }),
        catchError(err => {
          return handleError("An error occurred when login using Google!");
        })
      );
    })
  );

  @Effect()
  registerAuth = this.actions$.pipe(
    ofType(AuthActions.REGISTER),
    switchMap((authData: AuthActions.Register) => {
      return from(
        this._firebaseAuth.auth.createUserWithEmailAndPassword(
          authData.payload.email,
          authData.payload.password
        )
      ).pipe(
        map(res => {
          this._firebaseAuth.auth.currentUser.updateProfile({
            displayName: authData.payload.displayName
          });
          return handleAuthentication(
            authData.payload.displayName,
            authData.payload.email,
            null
          );
        }),
        catchError(err => {
          return handleError(err.message);
        })
      );
    })
  );

  @Effect()
  userAndPasswordAuth = this.actions$.pipe(
    ofType(AuthActions.LOGIN_WITH_EMAIL_AND_PASSWORD),
    switchMap((authData: AuthActions.LoginWithUserAndPassword) => {
      return from(
        this._firebaseAuth.auth.signInWithEmailAndPassword(
          authData.payload.email,
          authData.payload.password
        )
      ).pipe(
        map(res => {
          return handleAuthentication(
            res.user.displayName,
            res.user.email,
            null
          );
        }),
        catchError(err => {
          return handleError(err.message);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (this.router.url === "/signIn") {
        this.zone.run(() => {
          this.router.navigate([""]);
        });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) {}
}
