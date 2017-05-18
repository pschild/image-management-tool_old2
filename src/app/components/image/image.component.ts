import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {IImage} from "../../models/image.model";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Router} from "@angular/router";
import {addToSelection, clearSelection, removeFromSelection} from "../../actions/editor.actions";
import {IFile} from "../../models/file.model";

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy {

    image: IImage;

    @Input() file: IFile;

    subscriptions: Subscription[] = [];
    trustedImagePath: SafeStyle;
    selected: boolean;

    constructor(private store: Store<AppState>, private sanitizer: DomSanitizer, private router: Router) {
    }

    ngOnInit() {
        this.subscriptions.push(this.store.select(state => state.imagesState)
            .subscribe((imagesState) => {
                this.image = imagesState.images.find(image => image && image.name === this.file.fileName);
            })
        );

        this.subscriptions.push(this.store.select(state => state.editorState)
            .subscribe((editorState) => {
                this.selected = editorState.selection.filter((pathAndFileName) => pathAndFileName.path === this.file.path && pathAndFileName.fileName === this.file.fileName).length > 0
            })
        );

        this.trustedImagePath = this.sanitizePath();
    }

    sanitizePath() {
        let urlWithDoubleBackslashes = decodeURI(this.file.fullPath).split('\\').join('\\\\');
        return this.sanitizer.bypassSecurityTrustStyle('url("' + urlWithDoubleBackslashes + '")');
    }

    handleImageClicked() {
        this.store.dispatch(clearSelection());
        this.select();
        this.router.navigate(['editor']);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    select() {
        this.store.dispatch(addToSelection(this.file.path, this.file.fileName));
    }

    deselect() {
        this.store.dispatch(removeFromSelection(this.file.path, this.file.fileName));
    }

}
