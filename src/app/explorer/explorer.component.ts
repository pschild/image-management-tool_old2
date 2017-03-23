import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {getFiles, changeDirectory} from "./explorer.actions";

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

    files = [];
    currentPath;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.select(state => state.explorerState)
            .subscribe((explorerState) => {
                this.files = explorerState.fileList;
                this.currentPath = explorerState.currentDirectory
            }
        );

        this.store.dispatch(changeDirectory(this.currentPath));
        this.getFilesOfCurrentDirectory();
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
