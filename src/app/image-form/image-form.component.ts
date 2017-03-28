import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Image} from "../shared/image.model";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {saveImage} from "../editor/editor.actions";
import {Subscription} from "rxjs";
import {ImageService} from "../image/image.service";

@Component({
    selector: 'app-image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit, OnDestroy {

    model: Image;

    @Input() items: any[];

    isTimePeriod: boolean = false;
    isSavingInProgress: boolean = false;

    subscriptions: Subscription[] = [];

    constructor(private store: Store<AppState>, private imageService: ImageService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.store.select(state => state.editorState)
            .subscribe((editorState) => {
                this.isSavingInProgress = editorState.isSavingInProgress;
            }));

        this.model = {
            id: undefined,
            name: this.items[0].fileName,
            path: encodeURI(this.items[0].path),
            comment: undefined,
            fromDay: undefined,
            fromMonth: undefined,
            fromYear: undefined,
            toDay: undefined,
            toMonth: undefined,
            toYear: undefined
        };

        if (this.items.length === 1) {
            this.subscriptions.push(this.imageService.getImage(encodeURI(this.model.path), this.model.name)
                .subscribe((response) => {
                    this.model = Object.assign(this.model, response.image);
                }));
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    onSubmit() {
        this.store.dispatch(saveImage(this.model));
    }

}
