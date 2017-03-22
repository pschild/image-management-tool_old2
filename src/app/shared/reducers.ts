import {combineReducers} from '@ngrx/store';
import * as fromExplorer from '../explorer/explorer.reducers';

export interface AppState {
    explorerState: fromExplorer.ExplorerState;
}

const reducers = {
    explorerState: fromExplorer.ExplorerReducer
};

const combined = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combined(state, action);
}