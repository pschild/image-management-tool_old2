import { Action } from '@ngrx/store';
import {File} from "../shared/file.model";

export const GET_FILES = 'GET_FILES';
export const GET_FILES_SUCCESS = 'GET_FILES_SUCCESS';
export const GET_FILES_ERROR = 'GET_FILES_ERROR';

export function getFiles(path: string): Action {
    return {
        type: GET_FILES,
        payload: path
    };
}

export function getFilesSuccess(fileList: File[]): Action {
    return {
        type: GET_FILES_SUCCESS,
        payload: fileList
    };
}

export function getFilesError(error: string): Action {
    return {
        type: GET_FILES_ERROR,
        payload: error
    };
}