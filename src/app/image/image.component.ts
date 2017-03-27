import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {Image} from "../shared/image.model";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

    image: Image;

    @Input() fullPath: string;
    @Input() path: string;
    @Input() fileName: string;

    subscription: Subscription;
    trustedImagePath: SafeStyle;

    constructor(private store: Store<AppState>, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.imagesState)
            .subscribe((imagesState) => {
                this.image = imagesState.images.find(image => image && image.name === this.fileName);
            });

        this.trustedImagePath = this.sanitizePath();
    }

    private sanitizePath() {
        let urlWithdoubleBackslashes = decodeURI(this.fullPath).split('\\').join('\\\\');
        return this.sanitizer.bypassSecurityTrustStyle('url("' + urlWithdoubleBackslashes + '")');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
