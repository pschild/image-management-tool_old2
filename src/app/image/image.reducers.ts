import * as ImagesAction from './image.actions';
import {ActionReducer, Action} from "@ngrx/store";
import {Image} from "../shared/image.model";

export interface ImagesState {
    images: Image[];
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
            newState.images = action.payload;
            return newState;

        case ImagesAction.GET_IMAGES_ERROR:
            console.error(`Error while getting images: ${action.payload}`);
            return state;

        default:
            return state;
    }
};