import {Image} from "./image.model";
import {File} from "../shared/file.model";

export interface ImageGetResponse {
    image: Image;
}

export interface ImageGetErrorResponse {
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