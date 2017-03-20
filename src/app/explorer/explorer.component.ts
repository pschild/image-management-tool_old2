import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

    files = [];
    rootPath = 'C:';
    currentPath = 'C:\\imt';

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.getContents();
    }

    handleFolderClicked(folderName) {
        this.currentPath += '\\' + folderName;
        this.getContents();
    }

    openPreviousDirectory() {
        let lastIndex = this.currentPath.lastIndexOf('\\');
        this.currentPath = this.currentPath.substring(0, lastIndex);
        this.getContents();
    }

    getContents() {
        var escapedPath = encodeURI(this.currentPath);
        this.http.get(`http://localhost:1234/files/${escapedPath}`)
            .map(res => res.json())
            .subscribe(
                (files) => {
                    this.files = files.files;
                }
            );
    }

}
