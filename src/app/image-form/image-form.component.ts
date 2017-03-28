import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../shared/image.model";

@Component({
    selector: 'app-image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

    model: Image;

    @Input() items: any[];

    isTimePeriod: boolean = false;

    constructor() {
    }

    ngOnInit() {
        console.log(this.items);

        this.model = {
            id: undefined,
            name: undefined,
            path: undefined,
            comment: undefined,
            fromDay: undefined,
            fromMonth: undefined,
            fromYear: undefined,
            toDay: undefined,
            toMonth: undefined,
            toYear: undefined
        };
    }

    onSubmit() {
        console.log(this.model);
    }

}
