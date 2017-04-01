import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "./editor.component";
import {ImageFormComponent} from "../image-form/image-form.component";
import {TagInputModule} from "ng2-tag-input";
import {TagService} from "../tag/tag.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TagInputModule
    ],
    declarations: [
        EditorComponent,
        ImageFormComponent
    ],
    providers: [TagService]
})
export class EditorModule {
}