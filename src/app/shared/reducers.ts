import {combineReducers} from '@ngrx/store';
import * as fromExplorer from '../reducers/explorer.reducers';
import * as fromEditor from '../reducers/editor.reducers';
import * as fromImages from '../reducers/image.reducers';
import * as fromTags from '../reducers/tag.reducers';

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