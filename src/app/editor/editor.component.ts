import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {clearSelection} from "./editor.actions";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

    items: any[];

    subscription: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.editorState)
            .subscribe((editorState) => {
                this.items = editorState.selection.map((pathAndFileName) => {
                    return {
                        path: decodeURI(pathAndFileName.path),
                        fileName: pathAndFileName.fileName
                    }
                });
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(clearSelection());
    }

}
