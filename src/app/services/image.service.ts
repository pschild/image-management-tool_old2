import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ImageGetResponse, ImagePostResponse, ImagePutResponse, ImagesGetResponse} from "../shared/responses";
import {Image} from "../models/image.model";

const BASE_URL = 'http://localhost:1234';

@Injectable()
export class ImageService {

    constructor(private http: Http) {
    }

    getImage(path, name): Observable<ImageGetResponse> {
        return this.http.get(`${BASE_URL}/image/${path}/${name}`)
            .map(res => <ImageGetResponse>res.json());
    }

    getImagesByPathAndNames(path: string, imageNames: string[]): Observable<ImagesGetResponse> {
        return this.http.post(`${BASE_URL}/images/byPathAndNames`, {
            path: path,
            imageNames: imageNames
        }).map(res => <ImagesGetResponse>res.json());
    }

    create(image: Image): Observable<ImagePostResponse> {
        return this.http.post(`${BASE_URL}/image`, image)
            .map(res => <ImagePostResponse>res.json());
    }

    update(id, image): Observable<ImagePutResponse> {
        return this.http.put(`${BASE_URL}/image/${id}`, image)
            .map(res => <ImagePutResponse>res.json());
    }

}
