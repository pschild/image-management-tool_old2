import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ExplorerComponent} from "./explorer.component";
import {ImageComponent} from "../image/image.component";
import {ExplorerService} from "../../services/explorer.service";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {ImageService} from "../../services/image.service";
import {ContentListComponent} from './content-list/content-list.component';
import { ExplorerActionsComponent } from './explorer-actions/explorer-actions.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ExplorerComponent,
        ImageComponent,
        LoadingSpinnerComponent,
        ContentListComponent,
        ExplorerActionsComponent
    ],
    providers: [ExplorerService, ImageService]
})
export class ExplorerModule {
}