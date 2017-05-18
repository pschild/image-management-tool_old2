import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {getFiles, changeDirectory, resetFiles} from "../../actions/explorer.actions";
import {Subscription} from "rxjs";
import {getImages} from "../../actions/image.actions";
import {IFile} from "../../models/file.model";
import {Router} from "@angular/router";
import {addToSelection, clearSelection} from "../../actions/editor.actions";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit, OnDestroy {

    files: IFile[] = [];
    currentDirectory: string = '';
    selection$: Observable<any[]>;
    imageCount$: Observable<number>;
    isFileListLoading$: Observable<boolean>;

    subscriptions: Subscription[] = [];

    constructor(private store: Store<fromRoot.AppState>, private router: Router) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store.select(fromRoot.getCurrentDirectory).subscribe((currentDirectory) => {
                this.currentDirectory = currentDirectory;
                this.store.dispatch(getFiles(encodeURI(this.currentDirectory)));
            })
        );

        this.subscriptions.push(
            this.store.select(fromRoot.getFileList).subscribe((fileList) => {
                this.files = fileList.filter((file: IFile) => { return file.isDirectory || file.isImage });

                if (fileList.length) {
                    this.store.dispatch(getImages(this.currentDirectory, fileList.map((file: IFile) => file.fileName)));
                }
            })
        );

        this.imageCount$ = this.store.select(fromRoot.getImageCount);
        this.selection$ = this.store.select(fromRoot.getSelection);
        this.isFileListLoading$ = this.store.select(fromRoot.isFileListLoading);
    }

    ngOnDestroy() {
        this.store.dispatch(resetFiles());

        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    handleFolderClicked(folderName) {
        if (this.currentDirectory && this.currentDirectory.length > 0) {
            this.currentDirectory += '\\';
        }
        this.currentDirectory += folderName;
        this.store.dispatch(changeDirectory(this.currentDirectory));
    }

    handleBulkEditButtonClicked() {
        this.router.navigate(['editor']);
    }

    selectAll() {
        this.files.filter((file: IFile) => file.isFile && file.isImage).forEach((file: IFile) => {
            this.store.dispatch(addToSelection(file.path, file.fileName));
        });
    }

    clearSelection() {
        this.store.dispatch(clearSelection());
    }

    openPreviousDirectory() {
        let lastIndex = this.currentDirectory.lastIndexOf('\\');
        this.currentDirectory = this.currentDirectory.substring(0, lastIndex);
        this.store.dispatch(changeDirectory(this.currentDirectory));
    }
}
