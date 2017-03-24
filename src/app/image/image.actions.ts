import { Action } from '@ngrx/store';
import {Image} from "../shared/image.model";

export const GET_IMAGE = 'GET_IMAGE';
export const GET_IMAGE_SUCCESS = 'GET_IMAGE_SUCCESS';
export const GET_IMAGE_ERROR = 'GET_IMAGE_ERROR';

export function getImage(path: string, name: string): Action {
    return {
        type: GET_IMAGE,
        payload: {
            path: path,
            name: name
        }
    };
}

export function getImageSuccess(image: Image): Action {
    return {
        type: GET_IMAGE_SUCCESS,
        payload: image
    };
}

export function getImageError(error: string): Action {
    return {
        type: GET_IMAGE_ERROR,
        payload: error
    };
}