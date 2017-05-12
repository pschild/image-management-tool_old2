import {Action} from '@ngrx/store';
import {Tag} from "../models/tag.model";

export const GET_TAGS = 'GET_TAGS';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_ERROR = 'GET_TAGS_ERROR';
export const CREATE_TAG = 'CREATE_TAG';
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const CREATE_TAG_ERROR = 'CREATE_TAG_ERROR';

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

export function createTag(data: any): Action {
    return {
        type: CREATE_TAG,
        payload: data
    };
}

export function createTagSuccess(tag: Tag): Action {
    return {
        type: CREATE_TAG_SUCCESS,
        payload: tag
    };
}

export function createTagError(error: string): Action {
    return {
        type: CREATE_TAG_ERROR,
        payload: error
    };
}