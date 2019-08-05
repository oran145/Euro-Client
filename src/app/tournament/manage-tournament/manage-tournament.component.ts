import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from "../../store/app.reducer";
import * as TournamentActions from "../store/tournament.actions";
import { Tournament } from "src/app/shared/tournament.model";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-manage-tournament",
  templateUrl: "./manage-tournament.component.html",
  styleUrls: ["./manage-tournament.component.css"]
})
export class ManageTournamentComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}
  tournament: Tournament;
  tournamentSub: Subscription;
  tournamentId: string;
  tournamentName: string;
  stages: {
    stageName: string;
    stageNumber: number;
    exactResult?: number;
    correctlyWinnigTeam?: number;
    howTheGameOverResult?: number;
  }[];
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tournamentId = params["id"];
    });

    this.stages = [
      { stageName: "Group-Stage", stageNumber: 1 },
      { stageName: "1/8 final", stageNumber: 2 },
      { stageName: "Quarter-finals", stageNumber: 3 },
      { stageName: "Half-finals", stageNumber: 4 },
      { stageName: "Final", stageNumber: 5 }
    ];

    this.store.dispatch(
      new TournamentActions.GetTournamentData(this.tournamentId)
    );
    this.tournamentSub = this.store
      .select("tournament")
      .subscribe(tournamentState => {
        this.tournament = tournamentState.tournamentData;
        this.initForm();
      });
  }

  private initForm() {
    console.log(this.tournament);
    console.log(this.stages);
  }
}
