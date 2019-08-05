import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as TournamentActions from "../store/tournament.actions";
import { Subscription } from "rxjs";
import { ScoreTable } from "src/app/shared/score-table.model";

@Component({
  selector: "app-score-table",
  templateUrl: "./score-table.component.html",
  styleUrls: ["./score-table.component.css"]
})
export class ScoreTableComponent implements OnInit {
  tournamentId: string;
  tournamentSub: Subscription;
  scoreTable: ScoreTable[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tournamentId = params["id"];
    });
    this.store.dispatch(new TournamentActions.GetScoreTable(this.tournamentId));
    this.tournamentSub = this.store
      .select("tournament")
      .subscribe(tournamentState => {
        this.scoreTable = tournamentState.scoreTable;
        this.loading = tournamentState.loading;
      });
  }
}
