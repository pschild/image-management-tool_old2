import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ExplorerComponent} from "./explorer.component";
import {ImageComponent} from "../image/image.component";
import {ExplorerService} from "./explorer.service";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ExplorerComponent,
        ImageComponent,
        LoadingSpinnerComponent
    ],
    providers: [ExplorerService]
})
export class ExplorerModule {
}