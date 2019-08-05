import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import * as fromApp from "../../store/app.reducer";
import * as TournamentActions from "../store/tournament.actions";

import { Store } from "@ngrx/store";
import { User } from "src/app/shared/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-tournament",
  templateUrl: "./create-tournament.component.html",
  styleUrls: ["./create-tournament.component.css"]
})
export class CreateTournamentComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, private route: Router) {}
  stages: {
    stageName: string;
    stageNumber: number;
    exactResult?: number;
    correctlyWinnigTeam?: number;
    howTheGameOverResult?: number;
  }[];
  tournamentName: string;
  currentUser: User;
  ngOnInit() {
    this.stages = [
      { stageName: "Group-Stage", stageNumber: 1 },
      { stageName: "1/8 final", stageNumber: 2 },
      { stageName: "Quarter-finals", stageNumber: 3 },
      { stageName: "Half-finals", stageNumber: 4 },
      { stageName: "Final", stageNumber: 5 }
    ];

    this.store.select("auth").subscribe(authState => {
      this.currentUser = new User(
        authState.user.displayName,
        authState.user.email,
        authState.user.imagePath
      );
    });
  }

  onSubmit() {
    console.log(this.stages);
    // if (!form.valid) {
    //   return;
    // }
    const tournamentName = this.tournamentName;

    const groupStageScore = {
      exactResult: this.stages[0].exactResult,
      correctlyWinnigTeam: this.stages[0].correctlyWinnigTeam
    };

    const top16Score = {
      exactResult: this.stages[1].exactResult,
      correctlyWinnigTeam: this.stages[1].correctlyWinnigTeam,
      howTheGameOverResult: this.stages[1].howTheGameOverResult
    };

    const quarterFinalsScore = {
      exactResult: this.stages[2].exactResult,
      correctlyWinnigTeam: this.stages[2].correctlyWinnigTeam,
      howTheGameOverResult: this.stages[2].howTheGameOverResult
    };

    const halfFinalsScore = {
      exactResult: this.stages[3].exactResult,
      correctlyWinnigTeam: this.stages[3].correctlyWinnigTeam,
      howTheGameOverResult: this.stages[3].howTheGameOverResult
    };

    const finalScore = {
      exactResult: this.stages[4].exactResult,
      correctlyWinnigTeam: this.stages[4].correctlyWinnigTeam,
      howTheGameOverResult: this.stages[4].howTheGameOverResult
    };

    const participants = [];

    const tournamentManager = this.currentUser.email;

    this.store.dispatch(
      new TournamentActions.CreateTournament({
        tournament: {
          tournamentName: tournamentName,
          groupStageScore: groupStageScore,
          top16Score: top16Score,
          quarterFinalsScore: quarterFinalsScore,
          halfFinalsScore: halfFinalsScore,
          finalScore: finalScore,
          participants: participants,
          tournamentManager: tournamentManager
        },
        user: this.currentUser
      })
    );
  }

  back() {
    this.route.navigate([""]);
  }
}
