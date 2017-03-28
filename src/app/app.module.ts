import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NavigationComponent} from './navigation/navigation.component';
import {ImprintComponent} from './imprint/imprint.component';
import {ExplorerModule} from "./explorer/explorer.module";
import {EditorModule} from "./editor/editor.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducer} from "./shared/reducers";
import {AppEffects} from "./shared/effects";

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        ImprintComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ExplorerModule,
        EditorModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(AppEffects)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
