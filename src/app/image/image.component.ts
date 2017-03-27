import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {Image} from "../shared/image.model";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Router} from "@angular/router";
import {addToBulkEditList, clearSelection, removeFromBulkEditList} from "../editor/editor.actions";

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy {

    image: Image;

    @Input() fullPath: string;
    @Input() path: string;
    @Input() fileName: string;

    subscription: Subscription;
    trustedImagePath: SafeStyle;

    constructor(private store: Store<AppState>, private sanitizer: DomSanitizer, private router: Router) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.imagesState)
            .subscribe((imagesState) => {
                this.image = imagesState.images.find(image => image && image.name === this.fileName);
            });

        this.trustedImagePath = this.sanitizePath();
    }

    sanitizePath() {
        let urlWithDoubleBackslashes = decodeURI(this.fullPath).split('\\').join('\\\\');
        return this.sanitizer.bypassSecurityTrustStyle('url("' + urlWithDoubleBackslashes + '")');
    }

    handleImageClicked() {
        this.store.dispatch(clearSelection());
        this.select();
        this.router.navigate(['editor']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    select() {
        this.store.dispatch(addToBulkEditList(this.path, this.fileName));
    }

    deselect() {
        this.store.dispatch(removeFromBulkEditList(this.path, this.fileName));
    }

}
