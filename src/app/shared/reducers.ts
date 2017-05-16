import {createSelector} from 'reselect';
import {combineReducers} from '@ngrx/store';
import * as fromExplorer from '../reducers/explorer.reducers';
import * as fromEditor from '../reducers/editor.reducers';
import * as fromImages from '../reducers/image.reducers';
import * as fromTags from '../reducers/tag.reducers';
import {IFile} from "../models/file.model";

export interface AppState {
    explorerState: fromExplorer.ExplorerState;
    editorState: fromEditor.EditorState;
    imagesState: fromImages.ImagesState;
    tagsState: fromTags.TagsState;
}

const reducers = {
    explorerState: fromExplorer.ExplorerReducer,
    editorState: fromEditor.EditorReducer,
    imagesState: fromImages.ImagesReducer,
    tagsState: fromTags.TagsReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}

export const getEditorState = (state: AppState) => state.editorState;
export const getSelection = createSelector(getEditorState, fromEditor.getSelection);

export const getExplorerState = (state: AppState) => state.explorerState;
export const getFileList = createSelector(getExplorerState, fromExplorer.getFileList);
export const getCurrentDirectory = createSelector(getExplorerState, fromExplorer.getCurrentDirectory);
export const isFileListLoading = createSelector(getExplorerState, fromExplorer.isFileListLoading);
export const getImageCount = createSelector(getFileList, (files) => {
    return files.filter((file: IFile) => file.isImage).length;
});