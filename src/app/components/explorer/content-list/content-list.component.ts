import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFile} from "../../../models/file.model";

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

    @Input() currentPath: string;
    @Input() files: IFile[];

    @Output() openPreviousDirectoryEvent = new EventEmitter();
    @Output() folderClickedEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    openPreviousDirectory() {
        this.openPreviousDirectoryEvent.emit();
    }

    handleFolderClicked(folderName: string) {
        this.folderClickedEvent.emit(folderName);
    }

}
