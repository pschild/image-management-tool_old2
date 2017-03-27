import * as EditorActions from './editor.actions';
import {Action, ActionReducer} from "@ngrx/store";

export interface EditorState {
    selection: any[];
}

const initialEditorState: EditorState = {
    selection: []
};

export const EditorReducer: ActionReducer<EditorState> = (state = initialEditorState, action: Action) => {
    let newState;
    switch (action.type) {
        case EditorActions.ADD_TO_SELECTION:
            newState = Object.assign({}, state);
            newState.selection.push(action.payload);
            return newState;

        case EditorActions.CLEAR_SELECTION:
            newState = Object.assign({}, state);
            newState.selection = [];
            return newState;

        default:
            return state;
    }
};