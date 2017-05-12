import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NavigationComponent} from './components/navigation/navigation.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {ExplorerModule} from "./components/explorer/explorer.module";
import {EditorModule} from "./components/editor/editor.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducer} from "./shared/reducers";
import {AppEffects} from "./shared/effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
        BrowserAnimationsModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(AppEffects)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
