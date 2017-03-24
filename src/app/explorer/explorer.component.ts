import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {getFiles, changeDirectory} from "./explorer.actions";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

    files = [];
    currentPath;
    isFileListLoading: boolean = false;

    subscription: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select(state => state.explorerState)
            .subscribe((explorerState) => {
                this.files = explorerState.fileList;
                this.currentPath = explorerState.currentDirectory;
                this.isFileListLoading = explorerState.isFileListLoading;
            }
        );

        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
    }

    ngOnDestroy(){
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
