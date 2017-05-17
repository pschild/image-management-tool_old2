import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../shared/reducers";
import {getFiles, changeDirectory} from "../../actions/explorer.actions";
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
    currentPath;
    selection$: Observable<any[]>;
    imageCount$: Observable<number>;
    isFileListLoading$: Observable<boolean>;

    subscriptions: Subscription[] = [];

    constructor(private store: Store<fromRoot.AppState>, private router: Router) {
    }

    ngOnInit() {
        this.subscriptions.push(this.store.select(state => state.explorerState)
            .subscribe((explorerState) => {
                this.files = explorerState.fileList.filter((file: IFile) => { return file.isDirectory || file.isImage });
                this.currentPath = explorerState.currentDirectory;
            }
        ));

        this.subscriptions.push(this.store.select('explorerState', 'fileList')
            .subscribe((fileList: IFile[]) => {
                if (fileList.length) {
                    this.store.dispatch(getImages(this.currentPath, fileList.map((file: IFile) => { return file.fileName })));
                }
            }
        ));

        this.imageCount$ = this.store.select(fromRoot.getImageCount);
        this.selection$ = this.store.select(fromRoot.getSelection);
        this.isFileListLoading$ = this.store.select(fromRoot.isFileListLoading);

        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    handleFolderClicked(folderName) {
        if (this.currentPath && this.currentPath.length > 0) {
            this.currentPath += '\\';
        }
        this.currentPath += folderName;
        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
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
        let lastIndex = this.currentPath.lastIndexOf('\\');
        this.currentPath = this.currentPath.substring(0, lastIndex);
        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
    }

    getFilesOfCurrentDirectory() {
        this.store.dispatch(getFiles(encodeURI(this.currentPath)));
    }

}
