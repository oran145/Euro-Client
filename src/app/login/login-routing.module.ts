import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register/register.component";
import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    children: [
      { path: "", component: SignInComponent },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
