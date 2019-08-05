import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import * as TournamentActions from "../tournament/store/tournament.actions";
import { User } from "../shared/user.model";
import { Subscription } from "rxjs";
import { UserTournament } from "../shared/user-tournament.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  error: string;
  userTournaments: UserTournament[];
  authSub: Subscription;
  tournamentSub: Subscription;
  selectedTournament: string;

  constructor(private route: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authSub = this.store.select("auth").subscribe(authState => {
      this.currentUser = new User(
        authState.user.displayName,
        authState.user.email,
        authState.user.imagePath
      );
      this.store.dispatch(
        new TournamentActions.GetUserTournaments(this.currentUser.email)
      );
    });
    this.tournamentSub = this.store
      .select("tournament")
      .subscribe(tournamentState => {
        this.userTournaments = tournamentState.userTournaments;
        this.error = tournamentState.tournamentError;
      });
  }

  createTournament() {
    this.route.navigate(["createTournament"]);
  }

  onSubmit(form: NgForm) {
    const tournamentId = form.value.tournamentId;

    if (!this.userTournaments.includes(tournamentId)) {
      this.store.dispatch(
        new TournamentActions.JoinTournament({
          tournamentId: tournamentId,
          user: this.currentUser
        })
      );
    } else {
      this.error = "You already registerd to this tournament!";
    }

    form.reset();
  }
  onHandleError() {
    this.store.dispatch(new TournamentActions.ClearError());
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.tournamentSub.unsubscribe();
  }
  onEnter() {
    const tournament = this.userTournaments.find(tournament => {
      return tournament.tournamentName == this.selectedTournament;
    });
    this.route.navigate(["scoreTable/" + tournament.tournamentId]);
  }
}
