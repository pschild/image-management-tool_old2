import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

    path: string;
    fileName: string;

    subscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.path = decodeURI(params['path']);
            this.fileName = params['fileName'];
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
