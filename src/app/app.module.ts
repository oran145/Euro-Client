import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AuthEffects } from "./login/store/auth.effects";
import { AuthGuard } from "./auth.guard";
import * as fromApp from "./store/app.reducer";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { CreateTournamentComponent } from "./tournament/create-tournament/create-tournament.component";
import { TournamentEffects } from "./tournament/store/tournament.effects";
import { ScoreTableComponent } from "./tournament/score-table/score-table.component";
import { PredictionsComponent } from "./tournament/predictions/predictions.component";
import { SharedModule } from "./shared/shared.module";
import { ManageTournamentComponent } from "./tournament/manage-tournament/manage-tournament.component";
import { StageFilterPipe } from "./tournament/predictions/stageFilter";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTournamentComponent,
    ScoreTableComponent,
    PredictionsComponent,
    ManageTournamentComponent,
    StageFilterPipe
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, TournamentEffects]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // LoginModule,
    SharedModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
