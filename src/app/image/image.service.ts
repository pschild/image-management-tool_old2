import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ImageGetResponse} from "../shared/responses";

const BASE_URL = 'http://localhost:1234';

@Injectable()
export class ImageService {

    constructor(private http: Http) {
    }

    getImage(path, name): Observable<ImageGetResponse> {
        return this.http.get(`${BASE_URL}/image/${path}/${name}`)
            .map(res => <ImageGetResponse>res.json());
    }

}
