import * as ImagesAction from './image.actions';
import {ActionReducer, Action} from "@ngrx/store";

export interface ImagesState {
    images: any[];
}

const initialImagesState: ImagesState = {
    images: []
};

export const ImagesReducer: ActionReducer<ImagesState> = (state = initialImagesState, action: Action) => {
    let newState;
    switch (action.type) {
        case ImagesAction.GET_IMAGE:
            return state;

        case ImagesAction.GET_IMAGE_SUCCESS:
            newState = Object.assign({}, state);
            newState.images.push(action.payload);
            return newState;

        case ImagesAction.GET_IMAGE_ERROR:
            console.error(`Error while getting image: ${action.payload}`);
            return state;

        default:
            return state;
    }
};