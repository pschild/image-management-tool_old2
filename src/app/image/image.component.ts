import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Http} from "@angular/http";
import {ImageGetResponse} from "../shared/responses";

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

    private id: number;

    @Input() fullPath: string;
    @Input() path: string;
    @Input() fileName: string;

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.getImageInfo();
    }

    getImageInfo() {
        var escapedPath = encodeURI(this.path);
        this.http.get(`http://localhost:1234/image/${escapedPath}/${this.fileName}`)
            .map(res => res.json())
            .subscribe(
                (imageResponse: ImageGetResponse) => {
                    if (imageResponse.image) {
                        this.id = imageResponse.image.id;
                    }
                }
            );
    }

}
