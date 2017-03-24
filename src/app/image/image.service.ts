import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ImageGetResponse, ImagesGetResponse} from "../shared/responses";

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

}
