import { Action } from '@ngrx/store';
import {IFile} from "../models/file.model";

export const GET_FILES = 'GET_FILES';
export const GET_FILES_SUCCESS = 'GET_FILES_SUCCESS';
export const GET_FILES_ERROR = 'GET_FILES_ERROR';
export const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY';

export function getFiles(path: string): Action {
    return {
        type: GET_FILES,
        payload: path
    };
}

export function getFilesSuccess(fileList: IFile[]): Action {
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

export function changeDirectory(directory: string): Action {
    return {
        type: CHANGE_DIRECTORY,
        payload: directory
    };
}