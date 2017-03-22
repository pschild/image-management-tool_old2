import {Image} from "../image/image.model";
import {File} from "../shared/file.model";

export interface ImageGetResponse {
    image: Image;
}

export interface FilesGetResponse {
    files: File[];
}

export interface FilesGetErrorResponse {
    success: boolean;
    error: string;
}