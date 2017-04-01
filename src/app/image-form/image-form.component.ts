import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {createImage, updateImage} from "../editor/editor.actions";
import {Observable, Subscription} from "rxjs";
import {ImageService} from "../image/image.service";
import {ImageGetResponse} from "../shared/responses";
import {Http} from "@angular/http";
import {Tag} from "../shared/tag.model";
import {createTag, getTags} from "../tag/tag.actions";

@Component({
    selector: 'app-image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit, OnDestroy, OnChanges {

    @Input() items: any[];

    formModel: any;
    images: any[] = [];

    tagsSuggestions: Tag[];

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

    constructor(private http: Http, private store: Store<AppState>, private imageService: ImageService) {
    }

    ngOnInit() {
        this.formModel = this.initialValues;

        if (this.items.length === 1) {
            let item = this.items[0];
            this.subscriptions.push(this.imageService.getImage(encodeURI(item.path), item.fileName)
                .subscribe((response: ImageGetResponse) => {
                    this.images = [response.image || {}]; // push empty object so that Object.assign can be used when saving
                    if (response.image) {
                        this.formModel = Object.assign({}, this.initialValues, response.image);
                    } else {
                        // set path and fileName when no image is found in the database
                        this.formModel = Object.assign({}, this.initialValues, {
                            path: encodeURI(item.path),
                            name: item.fileName
                        });
                    }
                    this.isTimePeriod = this.checkForTimePeriod();
                }));

        } else if (this.items.length > 1) {
            let observables = [];
            this.items.forEach((item) => {
                observables.push(this.imageService.getImage(encodeURI(item.path), item.fileName));
            });

            this.subscriptions.push(Observable.forkJoin(observables)
                .subscribe((responses: ImageGetResponse[]) => {
                    this.images = responses.filter(response => response.image).map((response: ImageGetResponse) => {
                        return response.image;
                    });
                    this.formModel = Object.assign({}, this.initialValues, this.getCommonValues());
                    this.isTimePeriod = this.checkForTimePeriod();
                }));
        }

        this.store.dispatch(getTags());

        this.subscriptions.push(this.store.select(state => state.tagsState)
            .subscribe((tagsState) => {
                this.tagsSuggestions = tagsState.tags;
            })
        );
    }

    onTagAdded(addedTag) {
        let foundTag = this.tagsSuggestions.filter(tag => tag.name === addedTag.name).length > 0;
        if (!foundTag) {
            this.store.dispatch(createTag(addedTag));
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        let currentItems = changes.items.currentValue;
        let remainingImages = [];
        currentItems.forEach((item) => {
            let image = this.images.filter(image => image.path === item.path && image.name === item.fileName)[0];
            if (image) {
                remainingImages.push(image);
            }
        });
        this.images = remainingImages;

        if (remainingImages.length > 0) {
            this.formModel = Object.assign({}, this.initialValues, this.getCommonValues());
        } else {
            this.formModel = this.initialValues;
        }

        this.isTimePeriod = this.checkForTimePeriod();
    }

    getCommonValues() {
        let commonValues = {};
        Object.keys(this.initialValues).forEach((key) => {
            let firstValue = this.images[0][key];
            let differenceFound = false;

            for (let i = 1; i < this.images.length; i++) {
                let image = this.images[i];
                if (image[key] !== firstValue) {
                    differenceFound = true;
                    break;
                }
            }

            if (!differenceFound) {
                commonValues[key] = firstValue;
            }
        });

        return commonValues;
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
        this.items.forEach((item: any) => {
            let relatedImage = this.images.filter(image => image.path === item.path && image.name === item.fileName)[0];
            if (relatedImage) {
                this.store.dispatch(updateImage(Object.assign(relatedImage, this.formModel)));
            } else {
                this.store.dispatch(createImage(Object.assign(item, this.formModel, { name: item.fileName })));
            }
        });
    }

}
