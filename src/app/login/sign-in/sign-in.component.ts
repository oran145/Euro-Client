import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "../store/auth.actions";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit, OnDestroy {
  showRegisterDialog: boolean;
  error: string;
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.showRegisterDialog = false;
    this.storeSub = this.store.select("auth").subscribe(authState => {
      this.error = authState.authError;
    });
  }
  onRegister() {
    this.router.navigate(["/signIn/register"]);
  }
  signInWithFacebook() {
    this.store.dispatch(new AuthActions.LoginWithFacebook());
  }
  signInWithGoogle() {
    this.store.dispatch(new AuthActions.LoginWithGoogle());
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(
      new AuthActions.LoginWithUserAndPassword({ email, password })
    );

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
