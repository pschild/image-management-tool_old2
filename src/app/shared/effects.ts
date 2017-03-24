import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from "rxjs";
import {ExplorerService} from "../explorer/explorer.service";

import * as actions from '../shared/actions';
import {
    FilesGetResponse, FilesGetErrorResponse,
    ImagesGetResponse, ImagesGetErrorResponse
} from "./responses";
import {ImageService} from "../image/image.service";

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions, private explorerService: ExplorerService, private imageService: ImageService) { }

    @Effect() getFilesEffects$ = this.actions$
        .ofType(actions.GET_FILES)
        .map((action) => action.payload)
        .switchMap(
            (path) => this.explorerService.getFiles(path)
                .map((result: FilesGetResponse) => {
                    return actions.getFilesSuccess(result.files);
                })
                .catch((response: FilesGetErrorResponse) => {
                    return Observable.of(actions.getFilesError(response.error));
                })
        );

    @Effect() getImagesEffects$ = this.actions$
        .ofType(actions.GET_IMAGES)
        .map((action) => action.payload)
        .mergeMap(
            (payload) => this.imageService.getImagesByPathAndNames(payload.path, payload.names)
                .map((result: ImagesGetResponse) => {
                    return actions.getImagesSuccess(result.images);
                })
                .catch((response: ImagesGetErrorResponse) => {
                    return Observable.of(actions.getImagesError(response.error));
                })
        );
}