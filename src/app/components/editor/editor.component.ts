import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {clearSelection, removeFromSelection} from "../../actions/editor.actions";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

    selectedImages$: Observable<{path: string, fileName: string}[]>;

    constructor(private store: Store<fromRoot.AppState>) {
    }

    ngOnInit() {
        this.selectedImages$ = this.store.select(fromRoot.getSelection)
            .map(selectedItems => selectedItems.map(item => {
                return {
                    path: decodeURI(item.path),
                    fileName: item.fileName
                }
            }));
    }

    ngOnDestroy() {
        this.store.dispatch(clearSelection());
    }

    removeFromSelection(item) {
        this.store.dispatch(removeFromSelection(encodeURI(item.path), item.fileName));
    }

}
