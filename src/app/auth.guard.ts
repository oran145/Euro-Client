import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as AuthActions from "./login/store/auth.actions";
import * as fromApp from "./store/app.reducer";
import { take, map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate() {
    return this.store.select("auth").pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          const user: {
            displayName: string;
            email: string;
            imagePath?: string;
          } = JSON.parse(sessionStorage.getItem("user"));
          if (user) {
            this.store.dispatch(
              new AuthActions.AuthenticateSuccess({
                displayName: user.displayName,
                email: user.email,
                imagePath: user.imagePath
              })
            );
            return true;
          }
          this._router.navigate(["signIn"]);
          return false;
        }
      })
    );
  }
}
