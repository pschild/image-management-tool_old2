import {Action} from '@ngrx/store';
import {Tag} from "../shared/tag.model";

export const GET_TAGS = 'GET_TAGS';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_ERROR = 'GET_TAGS_ERROR';

export function getTags(): Action {
    return {
        type: GET_TAGS
    };
}

export function getTagsSuccess(tagList: Tag[]): Action {
    return {
        type: GET_TAGS_SUCCESS,
        payload: tagList
    };
}

export function getTagsError(error: string): Action {
    return {
        type: GET_TAGS_ERROR,
        payload: error
    };
}