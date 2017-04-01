import * as TagActions from './tag.actions';
import {ActionReducer, Action} from "@ngrx/store";
import {Tag} from "../shared/tag.model";

export interface TagsState {
    tags: Tag[];
    isLoading: boolean;
}

const initialTagsState: TagsState = {
    tags: [],
    isLoading: false
};

export const TagsReducer: ActionReducer<TagsState> = (state = initialTagsState, action: Action) => {
    let newState;
    switch (action.type) {
        case TagActions.GET_TAGS:
            newState = Object.assign({}, state);
            newState.isLoading = true;
            return newState;

        case TagActions.GET_TAGS_SUCCESS:
            newState = Object.assign({}, state);
            newState.tags = action.payload;
            newState.isLoading = false;
            return newState;

        case TagActions.GET_TAGS_ERROR:
            newState.isLoading = false;
            console.error(`Error while getting tags: ${action.payload}`);
            return state;

        case TagActions.CREATE_TAG:
            return state;

        case TagActions.CREATE_TAG_SUCCESS:
            newState = Object.assign({}, state);
            newState.tags.push(action.payload);
            return state;

        case TagActions.CREATE_TAG_ERROR:
            console.error(`Error while adding tag: ${action.payload}`);
            return state;

        default:
            return state;
    }
};