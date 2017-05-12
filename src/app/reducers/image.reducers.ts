import * as ImagesAction from '../actions/image.actions';
import {ActionReducer, Action} from "@ngrx/store";
import {IImage} from "../models/image.model";

export interface ImagesState {
    images: IImage[];
}

const initialImagesState: ImagesState = {
    images: []
};

export const ImagesReducer: ActionReducer<ImagesState> = (state = initialImagesState, action: Action) => {
    let newState;
    switch (action.type) {
        case ImagesAction.GET_IMAGES:
            return state;

        case ImagesAction.GET_IMAGES_SUCCESS:
            newState = Object.assign({}, state);
            newState.images = action.payload || [];
            return newState;

        case ImagesAction.GET_IMAGES_ERROR:
            console.error(`Error while getting images: ${action.payload}`);
            return state;

        default:
            return state;
    }
};