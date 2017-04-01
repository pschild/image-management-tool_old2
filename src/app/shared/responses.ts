import {Image} from "./image.model";
import {File} from "../shared/file.model";
import {Tag} from "./tag.model";

export interface ImageGetResponse {
    image: Image;
}

export interface ImagePutResponse {
    image: Image;
}

export interface ImagePostResponse {
    image: Image;
}

export interface ImagePutErrorResponse {
    success: boolean;
    error: string;
}

export interface ImagePostErrorResponse {
    success: boolean;
    error: string;
}

export interface ImagesGetResponse {
    images: Image[];
}

export interface ImagesGetErrorResponse {
    success: boolean;
    error: string;
}

export interface FilesGetResponse {
    files: File[];
}

export interface FilesGetErrorResponse {
    success: boolean;
    error: string;
}

export interface TagsGetResponse {
    tags: Tag[];
}

export interface TagsGetErrorResponse {
    success: boolean;
    error: string;
}

export interface TagPostResponse {
    tag: Tag;
}

export interface TagPostErrorResponse {
    success: boolean;
    error: string;
}