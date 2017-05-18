import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-image-selection-preview',
    templateUrl: './image-selection-preview.component.html',
    styleUrls: ['./image-selection-preview.component.css']
})
export class ImageSelectionPreviewComponent implements OnInit {

    @Input() images: {path: string, fileName: string}[];

    @Output() removeFromSelectionEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleImageClicked(image) {
        this.removeFromSelectionEvent.emit(image);
    }

}
