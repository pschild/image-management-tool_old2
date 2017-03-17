import {Component} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    files = [];
    currentPath = 'C:\\Users\\john';

    constructor(private http: Http) {
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
