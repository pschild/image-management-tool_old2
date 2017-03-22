import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/reducers";
import {getFiles} from "./explorer.actions";

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

    files = [];
    rootPath = 'C:';
    currentPath = 'C:\\imt';

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.select(state => state.explorerState).subscribe(
            (explorerState) => {
                this.files = explorerState.fileList;
            }
        );

        this.getFilesOfCurrentDirectory();
    }

    handleFolderClicked(folderName) {
        this.currentPath += '\\' + folderName;
        this.getFilesOfCurrentDirectory();
    }

    openPreviousDirectory() {
        let lastIndex = this.currentPath.lastIndexOf('\\');
        this.currentPath = this.currentPath.substring(0, lastIndex);
        this.getFilesOfCurrentDirectory();
    }

    getFilesOfCurrentDirectory() {
        this.store.dispatch(getFiles(encodeURI(this.currentPath)));
    }

}
