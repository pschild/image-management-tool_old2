import {Action} from "@ngrx/store";
import {IImage} from "../models/image.model";

export const ADD_TO_SELECTION = 'ADD_TO_SELECTION';
export const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';

export const CREATE_IMAGE = 'CREATE_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const SAVE_IMAGE_SUCCESS = 'SAVE_IMAGE_SUCCESS';
export const SAVE_IMAGE_ERROR = 'SAVE_IMAGE_ERROR';

export function addToBulkEditList(path: string, fileName: string): Action {
    return {
        type: ADD_TO_SELECTION,
        payload: {
            path: path,
            fileName: fileName
        }
    };
}

export function removeFromBulkEditList(path: string, fileName: string): Action {
    return {
        type: REMOVE_FROM_SELECTION,
        payload: {
            path: path,
            fileName: fileName
        }
    };
}

export function clearSelection(): Action {
    return {
        type: CLEAR_SELECTION
    };
}

export function createImage(image: IImage): Action {
    return {
        type: CREATE_IMAGE,
        payload: image
    };
}

export function updateImage(image: IImage): Action {
    return {
        type: UPDATE_IMAGE,
        payload: image
    };
}

export function saveImageSuccess(image: IImage): Action {
    return {
        type: SAVE_IMAGE_SUCCESS,
        payload: image
    };
}

export function saveImageError(error: string): Action {
    return {
        type: SAVE_IMAGE_ERROR,
        payload: error
    };
}