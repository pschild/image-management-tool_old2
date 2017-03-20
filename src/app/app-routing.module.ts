import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExplorerComponent} from "./explorer/explorer.component";
import {ImprintComponent} from "./imprint/imprint.component";

const routes: Routes = [
    { path: '', redirectTo: '/explorer', pathMatch: 'full' },
    { path: 'explorer', component: ExplorerComponent },
    { path: 'imprint', component: ImprintComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}