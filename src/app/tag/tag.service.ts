import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {TagsGetResponse} from "../shared/responses";

const BASE_URL = 'http://localhost:1234';

@Injectable()
export class TagService {

    constructor(private http: Http) {
    }

    loadTags(): Observable<TagsGetResponse> {
        return this.http.get(`${BASE_URL}/tags`)
            .map(res => <TagsGetResponse>res.json());
    }

}