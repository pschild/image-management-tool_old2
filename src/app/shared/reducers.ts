import {combineReducers} from '@ngrx/store';
import * as fromExplorer from '../explorer/explorer.reducers';
import * as fromEditor from '../editor/editor.reducers';
import * as fromImages from '../image/image.reducers';

export interface AppState {
    explorerState: fromExplorer.ExplorerState;
    editorState: fromEditor.EditorState;
    imagesState: fromImages.ImagesState;
}

const reducers = {
    explorerState: fromExplorer.ExplorerReducer,
    editorState: fromEditor.EditorReducer,
    imagesState: fromImages.ImagesReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}