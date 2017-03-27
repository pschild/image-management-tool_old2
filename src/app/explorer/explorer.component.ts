import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {getFiles, changeDirectory} from "./explorer.actions";
import {Subscription} from "rxjs";
import {getImages} from "../image/image.actions";
import {File} from "../shared/file.model";

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit, OnDestroy {

    files = [];
    currentPath;
    isFileListLoading: boolean = false;

    subscription: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.explorerState)
            .subscribe((explorerState) => {
                this.files = explorerState.fileList.filter((file: File) => { return file.isDirectory || file.isImage });
                this.currentPath = explorerState.currentDirectory;
                this.isFileListLoading = explorerState.isFileListLoading;
            }
        );

        this.store.select('explorerState', 'fileList')
            .subscribe((fileList: File[]) => {
                if (fileList.length) {
                    this.store.dispatch(getImages(this.currentPath, fileList.map((file: File) => { return file.fileName })));
                }
            }
        );

        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    handleFolderClicked(folderName) {
        if (this.currentPath && this.currentPath.length > 0) {
            this.currentPath += '\\';
        }
        this.currentPath += folderName;
        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
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
