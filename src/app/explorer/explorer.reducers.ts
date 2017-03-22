import * as ExplorerActions from './explorer.actions';
import {ActionReducer, Action} from "@ngrx/store";
import {File} from "../shared/file.model";

export interface ExplorerState {
    fileList: File[];
    isFileListLoaded: boolean;
}

const initialExplorerState: ExplorerState = {
    fileList: [],
    isFileListLoaded: false,
};

export const ExplorerReducer: ActionReducer<ExplorerState> = (state = initialExplorerState, action: Action) => {
    let newState;
    switch (action.type) {
        case ExplorerActions.GET_FILES:
            return initialExplorerState;

        case ExplorerActions.GET_FILES_SUCCESS:
            newState = Object.assign({}, state);
            newState.fileList = action.payload;
            newState.isFileListLoaded = true;
            return newState;

        case ExplorerActions.GET_FILES_ERROR:
            console.error(`Error while getting files: ${action.payload}`);
            return state;

        default:
            return state;
    }
};