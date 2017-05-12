import * as EditorActions from '../actions/editor.actions';
import {Action, ActionReducer} from "@ngrx/store";

export interface EditorState {
    selection: any[];
    isSavingInProgress: boolean;
}

const initialEditorState: EditorState = {
    selection: [],
    isSavingInProgress: false
};

export const EditorReducer: ActionReducer<EditorState> = (state = initialEditorState, action: Action) => {
    let newState;
    switch (action.type) {
        case EditorActions.ADD_TO_SELECTION:
            newState = Object.assign({}, state);
            if (!newState.selection.find(item => item.fileName === action.payload.fileName)) {
                newState.selection.push(action.payload);
            }
            return newState;

        case EditorActions.REMOVE_FROM_SELECTION:
            newState = Object.assign({}, state);
            newState.selection = newState.selection.filter((item) => {
                return !(item.path === action.payload.path && item.fileName === action.payload.fileName);
            });
            return newState;

        case EditorActions.CLEAR_SELECTION:
            newState = Object.assign({}, state);
            newState.selection = [];
            return newState;

        case EditorActions.CREATE_IMAGE:
        case EditorActions.UPDATE_IMAGE:
            newState = Object.assign({}, state);
            newState.isSavingInProgress = true;
            return newState;

        case EditorActions.SAVE_IMAGE_SUCCESS:
            newState = Object.assign({}, state);
            newState.isSavingInProgress = false;
            return newState;

        case EditorActions.SAVE_IMAGE_ERROR:
            newState.isSavingInProgress = false;
            console.error(`Error while saving image: ${action.payload}`);
            return state;

        default:
            return state;
    }
};