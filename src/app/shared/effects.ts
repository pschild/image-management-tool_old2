import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from "rxjs";
import {ExplorerService} from "../explorer/explorer.service";

import * as actions from '../shared/actions';
import {FilesGetResponse, FilesGetErrorResponse} from "./responses";

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions, private explorerService: ExplorerService) { }

    @Effect() getFilesEffects$ = this.actions$
        .ofType(actions.GET_FILES)
        .map((action) => action.payload)
        .switchMap(
            (path) => this.explorerService.getFiles(path)
                .map((result: FilesGetResponse) => actions.getFilesSuccess(result.files))
                .catch((response: FilesGetErrorResponse) => {
                    return Observable.of(actions.getFilesError(response.error));
                })
        );
}