import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from "../../store/app.reducer";
import * as TournamentActions from "../store/tournament.actions";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { map, take, filter } from "rxjs/operators";
import {
  UsersPredictions,
  gamePrediction
} from "src/app/shared/users-predictions.model";
import { User } from "src/app/shared/user.model";
import { Game } from "src/app/shared/game.model";
import { Tournament } from "src/app/shared/tournament.model";
import { getLocaleMonthNames } from "@angular/common";

@Component({
  selector: "app-predictions",
  templateUrl: "./predictions.component.html",
  styleUrls: ["./predictions.component.css"]
})
export class PredictionsComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  tournamentSub: Subscription;
  authSub: Subscription;
  tournamentId: string;
  loading: boolean;
  games;
  userPredictions: UsersPredictions;
  currentUser: User;
  tournamentData: Tournament;
  stages: { displayName: string; dbName: string }[] = [
    { displayName: "Group-Stage", dbName: "groupStage" },
    { displayName: "Top 16", dbName: "top16" },
    { displayName: "Quarter-Final", dbName: "quarterFinal" },
    { displayName: "Half-Final", dbName: "halfFinals" },
    { displayName: "Final", dbName: "final" }
  ];
  currentStage: { displayName: string; dbName: string };

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tournamentId = params["id"];
    });
    this.currentStage = {
      displayName: "Group-Stage",
      dbName: "groupStage"
    };

    this.store.select("auth").subscribe(authState => {
      this.currentUser = authState.user;
      this.store.dispatch(
        new TournamentActions.GetGamesAndPredictions({
          tournamentId: this.tournamentId,
          userEmail: this.currentUser.email
        })
      );
      this.store.dispatch(
        new TournamentActions.GetTournamentData(this.tournamentId)
      );
    });
    this.tournamentSub = this.store
      .select("tournament")
      .pipe(filter(res => res.games !== null && res.tournamentData !== null))
      .subscribe(tournamentState => {
        this.loading = tournamentState.loading;
        this.userPredictions = tournamentState.userPredictions;
        this.tournamentData = tournamentState.tournamentData;
        this.games = tournamentState.games.map(game => {
          if (new Date(game.gameStartDate) < new Date())
            game["gameStarted"] = true;
          else game["gameStarted"] = false;

          const cur = this.userPredictions.gamesPredictions.find(prediction => {
            return prediction.gameId === game["_id"];
          });
          this.checkWin(game, cur);
          if (cur) {
            return {
              ...game,
              userPrediction: cur,
              groupAImg: "../../assets/images/noPic.png",
              groupBImg: "../../assets/images/noPic.png"
            };
          }
          return {
            ...game,
            userPrediction: {
              gameId: game["_id"],
              groupAPrediction: null,
              groupBPrediction: null
            },
            groupAImg: "../../assets/images/noPic.png",
            groupBImg: "../../assets/images/noPic.png"
          };
        });
        this.sortByDate();
        console.log(this.games);
      });
  }

  onSave() {
    let predictions: {
      gameId: string;
      groupAPrediction: number;
      groupBPrediction: number;
      howTheGameOver?: string;
      MovedToNextStage?: string;
    }[] = [];

    this.games.map(game => {
      if (
        game.userPrediction.groupAPrediction !== null &&
        game.userPrediction.groupBPrediction !== null
      ) {
        predictions.push(game.userPrediction);
      }
    });
    console.log(predictions);
    this.store.dispatch(
      new TournamentActions.SaveUserPredictions({
        tournamentId: this.tournamentId,
        userEmail: this.currentUser.email,
        gamesPredictions: predictions
      })
    );
  }
  sortByDate() {
    return this.games.sort((gameA, gameB) => {
      return (
        new Date(gameA.gameStartDate).getTime() -
        new Date(gameB.gameStartDate).getTime()
      );
    });
  }

  checkWin(game: Game, userPrediction: gamePrediction) {
    var points = null;
    if (
      game.groupAResult90Min !== undefined &&
      game.groupBResult90Min !== undefined
    ) {
      points = 0;
      if (!userPrediction) points = 0;
      else if (
        game.groupAResult90Min == userPrediction.groupAPrediction &&
        game.groupBResult90Min == userPrediction.groupBPrediction
      ) {
        points = this.tournamentData[game.stage + "Score"].exactResult;
      } else {
        var gameResult = game.groupAResult90Min - game.groupBResult90Min;
        var prediction =
          userPrediction.groupAPrediction - userPrediction.groupBPrediction;
        if (gameResult * prediction > 0 || gameResult == prediction) {
          points = this.tournamentData[game.stage + "Score"]
            .correctlyWinnigTeam;
        }
      }
      if (game.stage !== "groupStage") {
        if (game.howTheGameOver == userPrediction.howTheGameOver) {
          if (points)
            points += this.tournamentData[game.stage + "Score"]
              .howTheGameOverResult;
          else
            points = this.tournamentData[game.stage + "Score"]
              .howTheGameOverResult;
        }
      }
    }
    game["points"] = points;
    if (points === null) game["class"] = "none";
    else if (points === 0) game["class"] = "lose";
    else if (
      (points === this.tournamentData[game.stage + "Score"].exactResult &&
        game.stage === "groupStage") ||
      (game.stage !== "groupStage" &&
        points ===
          this.tournamentData[game.stage + "Score"].exactResult +
            this.tournamentData[game.stage + "Score"].howTheGameOverResult)
    ) {
      game["class"] = "win";
    } else game["class"] = "partial-win";
  }
  changeStage(index) {
    this.currentStage = this.stages[index];
  }
}
