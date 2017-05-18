import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "./editor.component";
import {ImageFormComponent} from "../image-form/image-form.component";
import {TagInputModule} from "ng2-tag-input";
import {TagService} from "../../services/tag.service";
import {CommonValuesHelper} from "../image-form/common-values-helper/common-values-helper";
import { ImageSelectionPreviewComponent } from './image-selection-preview/image-selection-preview.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TagInputModule
    ],
    declarations: [
        EditorComponent,
        ImageFormComponent,
        ImageSelectionPreviewComponent
    ],
    providers: [TagService, CommonValuesHelper]
})
export class EditorModule {
}