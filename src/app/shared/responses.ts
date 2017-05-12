import {IImage} from "../models/image.model";
import {IFile} from "../models/file.model";
import {ITag} from "../models/tag.model";

export interface ImageGetResponse {
    image: IImage;
}

export interface ImagePutResponse {
    image: IImage;
}

export interface ImagePostResponse {
    image: IImage;
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
    images: IImage[];
}

export interface ImagesGetErrorResponse {
    success: boolean;
    error: string;
}

export interface FilesGetResponse {
    files: IFile[];
}

export interface FilesGetErrorResponse {
    success: boolean;
    error: string;
}

export interface TagsGetResponse {
    tags: ITag[];
}

export interface TagsGetErrorResponse {
    success: boolean;
    error: string;
}

export interface TagPostResponse {
    tag: ITag;
}

export interface TagPostErrorResponse {
    success: boolean;
    error: string;
}