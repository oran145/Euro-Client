import { NgModule } from "@angular/core";
import { AlertComponent } from "../shared/alert/alert.component";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [AlertComponent, CommonModule, LoadingSpinnerComponent],
  entryComponents: [AlertComponent, LoadingSpinnerComponent]
})
export class SharedModule {}
