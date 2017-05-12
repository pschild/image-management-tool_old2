import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-explorer-actions',
    templateUrl: './explorer-actions.component.html',
    styleUrls: ['./explorer-actions.component.css']
})
export class ExplorerActionsComponent implements OnInit {

    @Input() imageCount: number;
    @Input() showBulkEditButton: boolean;
    @Input() bulkEditCount: number;

    @Output() toggleAllEvent = new EventEmitter();
    @Output() startBulkEditEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleToggleAllButtonClicked() {
        this.toggleAllEvent.emit();
    }

    handleBulkEditButtonClicked() {
        this.startBulkEditEvent.emit();
    }

}
