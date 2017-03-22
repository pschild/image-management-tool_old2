import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavigationComponent } from './navigation/navigation.component';
import { ImprintComponent } from './imprint/imprint.component';
import {ExplorerModule} from "./explorer/explorer.module";

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
        ExplorerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
