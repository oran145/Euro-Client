import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreateTournamentComponent } from "./tournament/create-tournament/create-tournament.component";
import { ScoreTableComponent } from "./tournament/score-table/score-table.component";
import { PredictionsComponent } from "./tournament/predictions/predictions.component";
import { ManageTournamentComponent } from "./tournament/manage-tournament/manage-tournament.component";
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: "scoreTable/:id",
    canActivate: [AuthGuard],
    component: ScoreTableComponent
  },
  {
    path: "predictions/:id",
    canActivate: [AuthGuard],
    component: PredictionsComponent
  },
  {
    path: "manageTournament/:id",
    canActivate: [AuthGuard],
    component: ManageTournamentComponent
  },
  {
    path: "createTournament",
    canActivate: [AuthGuard],
    component: CreateTournamentComponent
  },
  {
    path: "signIn",
    loadChildren: "./login/login.module#LoginModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
