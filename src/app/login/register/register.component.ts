import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromApp from "../../store/app.reducer";
import * as AuthActions from "../store/auth.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(public store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.firstName + " " + form.value.lastName;

    this.store.dispatch(
      new AuthActions.Register({ email, password, displayName })
    );

    form.reset();
    close();
  }
}
