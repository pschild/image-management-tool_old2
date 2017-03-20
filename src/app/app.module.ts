import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import { ImageComponent } from './image/image.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavigationComponent } from './navigation/navigation.component';
import { ImprintComponent } from './imprint/imprint.component';

@NgModule({
    declarations: [
        AppComponent,
        ImageComponent,
        ExplorerComponent,
        NavigationComponent,
        ImprintComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
