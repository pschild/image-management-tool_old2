import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-explorer-actions',
    templateUrl: './explorer-actions.component.html',
    styleUrls: ['./explorer-actions.component.css']
})
export class ExplorerActionsComponent implements OnInit {

    @Input() imageCount: number;
    @Input() selection: any[];

    @Output() selectAllEvent = new EventEmitter();
    @Output() clearSelectionEvent = new EventEmitter();
    @Output() startBulkEditEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleToggleAllButtonClicked() {
        if (this.imageCount > this.selection.length) {
            this.selectAllEvent.emit();
        } else {
            this.clearSelectionEvent.emit();
        }
    }

    handleBulkEditButtonClicked() {
        this.startBulkEditEvent.emit();
    }

}
