import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from "rxjs";
import {ExplorerService} from "../explorer/explorer.service";

import * as actions from '../shared/actions';
import {
    FilesGetResponse, FilesGetErrorResponse,
    ImagesGetResponse, ImagesGetErrorResponse, ImagePutResponse, ImagePutErrorResponse, ImagePostResponse,
    ImagePostErrorResponse, TagsGetResponse, TagsGetErrorResponse, TagPostResponse, TagPostErrorResponse
} from "./responses";
import {ImageService} from "../image/image.service";
import {TagService} from "../tag/tag.service";

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions, private explorerService: ExplorerService, private imageService: ImageService, private tagService: TagService) { }

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

    @Effect() createImageEffects$ = this.actions$
        .ofType(actions.CREATE_IMAGE)
        .map((action) => action.payload)
        .mergeMap(
            (image) => this.imageService.create(image)
                .map((result: ImagePostResponse) => {
                    return actions.saveImageSuccess(result.image);
                })
                .catch((response: ImagePostErrorResponse) => {
                    return Observable.of(actions.saveImageError(response.error));
                })
        );

    @Effect() updateImageEffects$ = this.actions$
        .ofType(actions.UPDATE_IMAGE)
        .map((action) => action.payload)
        .mergeMap(
            (image) => this.imageService.update(image.id, image)
                .map((result: ImagePutResponse) => {
                    return actions.saveImageSuccess(result.image);
                })
                .catch((response: ImagePutErrorResponse) => {
                    return Observable.of(actions.saveImageError(response.error));
                })
        );

    @Effect() getTagsEffects$ = this.actions$
        .ofType(actions.GET_TAGS)
        .map((action) => action.payload)
        .mergeMap(
            (payload) => this.tagService.loadTags()
                .map((result: TagsGetResponse) => {
                    return actions.getTagsSuccess(result.tags);
                })
                .catch((response: TagsGetErrorResponse) => {
                    return Observable.of(actions.getTagsError(response.error));
                })
        );

    @Effect() createTagEffects$ = this.actions$
        .ofType(actions.CREATE_TAG)
        .map((action) => action.payload)
        .mergeMap(
            (payload) => this.tagService.createTag(payload)
                .map((result: TagPostResponse) => {
                    return actions.createTagSuccess(result.tag);
                })
                .catch((response: TagPostErrorResponse) => {
                    return Observable.of(actions.createTagError(response.error));
                })
        );
}