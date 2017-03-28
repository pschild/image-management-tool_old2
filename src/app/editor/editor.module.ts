import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "./editor.component";
import {ImageFormComponent} from "../image-form/image-form.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        EditorComponent,
        ImageFormComponent
    ],
    providers: []
})
export class EditorModule {
}