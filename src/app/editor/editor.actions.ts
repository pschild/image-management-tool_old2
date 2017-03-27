import {Action} from "@ngrx/store";

export const ADD_TO_SELECTION = 'ADD_TO_SELECTION';
export const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';

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