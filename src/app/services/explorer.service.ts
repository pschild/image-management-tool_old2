import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {FilesGetResponse} from "../shared/responses";

const BASE_URL = 'http://localhost:1234';

@Injectable()
export class ExplorerService {

    constructor(private http: Http) {
    }

    getFiles(path): Observable<FilesGetResponse> {
        return this.http.get(`${BASE_URL}/files/${path}`)
            .map(res => <FilesGetResponse>res.json());
    }

}