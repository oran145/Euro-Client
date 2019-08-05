import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register/register.component";
import { NgModule } from "@angular/core";
import { AlertComponent } from "../shared/alert/alert.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SignInComponent],
  imports: [LoginRoutingModule, SharedModule, CommonModule, FormsModule]
})
export class LoginModule {}
