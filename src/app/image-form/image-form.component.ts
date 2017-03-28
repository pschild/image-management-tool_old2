import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Image} from "../shared/image.model";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {createImage, updateImage} from "../editor/editor.actions";
import {Subscription} from "rxjs";
import {ImageService} from "../image/image.service";
import {ImageGetResponse} from "../shared/responses";

@Component({
    selector: 'app-image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit, OnDestroy {

    @Input() items: any[];

    formModel: any;
    images: any[] = [];

    isTimePeriod: boolean = false;
    isSavingInProgress: boolean = false;

    subscriptions: Subscription[] = [];

    initialValues: any = {
        comment: undefined,
        fromDay: undefined,
        fromMonth: undefined,
        fromYear: undefined,
        toDay: undefined,
        toMonth: undefined,
        toYear: undefined
    };

    constructor(private store: Store<AppState>, private imageService: ImageService) {
    }

    ngOnInit() {
        this.formModel = this.initialValues;

        let item = this.items[0];
        this.subscriptions.push(this.imageService.getImage(encodeURI(item.path), item.fileName)
            .subscribe((response: ImageGetResponse) => {
                this.images = [response.image || {}]; // push empty object so that Object.assign can be used when saving
                if (response.image) {
                    this.formModel = Object.assign(this.initialValues, response.image);
                } else {
                    // set path and fileName when no image is found in the database
                    this.formModel = Object.assign(this.initialValues, { path: encodeURI(item.path), name: item.fileName });
                }
                this.isTimePeriod = this.checkForTimePeriod();
            }));
    }

    checkForTimePeriod() {
        return !!(this.formModel.toDay || this.formModel.toMonth || this.formModel.toYear);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    onSubmit() {
        this.images.forEach((image: Image) => {
            if (image.id) {
                this.store.dispatch(updateImage(Object.assign(image, this.formModel)));
            } else {
                this.store.dispatch(createImage(Object.assign(image, this.formModel)));
            }
        });
    }

}
