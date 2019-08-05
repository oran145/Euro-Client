import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // showRegisterDialog: boolean;
  // error: string;
  // private storeSub: Subscription;

  constructor() {}

  ngOnInit() {
    // this.showRegisterDialog = false;
    // this.storeSub = this.store.select("auth").subscribe(authState => {
    //   this.error = authState.authError;
    // });
  }
  // onRegister() {
  //   this.router.navigate(["/signIn/register"]);
  // }
  // signInWithFacebook() {
  //   this.store.dispatch(new AuthActions.LoginWithFacebook());
  // }
  // signInWithGoogle() {
  //   this.store.dispatch(new AuthActions.LoginWithGoogle());
  // }

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;

  //   this.store.dispatch(
  //     new AuthActions.LoginWithUserAndPassword({ email, password })
  //   );

  //   form.reset();
  // }

  // onHandleError() {
  //   this.store.dispatch(new AuthActions.ClearError());
  // }
  // ngOnDestroy() {
  //   this.storeSub.unsubscribe();
  // }
}
