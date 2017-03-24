import { Action } from '@ngrx/store';
import {Image} from "../shared/image.model";

export const GET_IMAGES = 'GET_IMAGES';
export const GET_IMAGES_SUCCESS = 'GET_IMAGES_SUCCESS';
export const GET_IMAGES_ERROR = 'GET_IMAGES_ERROR';

export function getImages(path: string, names: string[]): Action {
    return {
        type: GET_IMAGES,
        payload: {
            path: path,
            names: names
        }
    };
}

export function getImagesSuccess(images: Image[]): Action {
    return {
        type: GET_IMAGES_SUCCESS,
        payload: images
    };
}

export function getImagesError(error: string): Action {
    return {
        type: GET_IMAGES_ERROR,
        payload: error
    };
}