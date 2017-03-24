import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {getImage} from "./image.actions";
import {Image} from "../shared/image.model";
import {Subscription} from "rxjs";

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

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        // TODO: simple http call instead of store/state?
        this.subscription = this.store.select(state => state.imagesState)
            .subscribe((imagesState) => {
                this.image = imagesState.images.find(image => image && image.name === this.fileName);
            });

        this.store.dispatch(getImage(encodeURI(this.path), this.fileName));
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
