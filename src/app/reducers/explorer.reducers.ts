import * as ExplorerActions from '../actions/explorer.actions';
import {ActionReducer, Action} from "@ngrx/store";
import {IFile} from "../models/file.model";

export interface ExplorerState {
    currentDirectory: string,
    fileList: IFile[];
    isFileListLoading: boolean;
}

const initialExplorerState: ExplorerState = {
    currentDirectory: 'C:\\imt',
    fileList: [],
    isFileListLoading: false
};

export const ExplorerReducer: ActionReducer<ExplorerState> = (state = initialExplorerState, action: Action) => {
    let newState;
    switch (action.type) {
        case ExplorerActions.GET_FILES:
            newState = Object.assign({}, state);
            newState.isFileListLoading = true;
            return newState;

        case ExplorerActions.GET_FILES_SUCCESS:
            newState = Object.assign({}, state);
            newState.fileList = action.payload;
            newState.isFileListLoading = false;
            return newState;

        case ExplorerActions.GET_FILES_ERROR:
            newState.isFileListLoading = false;
            console.error(`Error while getting files: ${action.payload}`);
            return state;

        case ExplorerActions.CHANGE_DIRECTORY:
            newState = Object.assign({}, state);
            newState.currentDirectory = action.payload;
            return newState;

        default:
            return state;
    }
};