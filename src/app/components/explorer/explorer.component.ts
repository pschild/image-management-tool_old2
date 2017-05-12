import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/reducers";
import {getFiles, changeDirectory} from "../../actions/explorer.actions";
import {Subscription} from "rxjs";
import {getImages} from "../../actions/image.actions";
import {IFile} from "../../models/file.model";
import {Router} from "@angular/router";
import {addToBulkEditList, clearSelection} from "../../actions/editor.actions";

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit, OnDestroy {

    files: IFile[] = [];
    currentPath;
    isFileListLoading: boolean = false;
    showBulkEditButton: boolean = false;
    bulkEditCount: number;
    imageCount: number;

    subscriptions: Subscription[] = [];

    constructor(private store: Store<AppState>, private router: Router) {
    }

    ngOnInit() {
        this.subscriptions.push(this.store.select(state => state.explorerState)
            .subscribe((explorerState) => {
                this.files = explorerState.fileList.filter((file: IFile) => { return file.isDirectory || file.isImage });
                this.imageCount = this.files.filter((file: IFile) => file.isImage).length;
                this.currentPath = explorerState.currentDirectory;
                this.isFileListLoading = explorerState.isFileListLoading;
            }
        ));

        this.subscriptions.push(this.store.select('explorerState', 'fileList')
            .subscribe((fileList: IFile[]) => {
                if (fileList.length) {
                    this.store.dispatch(getImages(this.currentPath, fileList.map((file: IFile) => { return file.fileName })));
                }
            }
        ));

        this.subscriptions.push(this.store.select(state => state.editorState)
            .subscribe((editorState) => {
                this.showBulkEditButton = editorState.selection.length > 1;
                this.bulkEditCount = editorState.selection.length;
            }
        ));

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

    handleToggleAllButtonClicked() {
        let allSelected = this.imageCount === this.bulkEditCount;
        this.files.filter((file: IFile) => file.isFile && file.isImage).forEach((file: IFile) => {
            if (!allSelected) {
                this.store.dispatch(addToBulkEditList(file.path, file.fileName));
            } else {
                this.store.dispatch(clearSelection());
            }
        });
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
