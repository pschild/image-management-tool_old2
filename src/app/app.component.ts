import { Component } from '@angular/core';
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

  constructor(private http: Http) {
    http.get('http://localhost:1234/files/C%3A%5CUsers%5Cjohn%5CPictures')
        .map(res => res.json())
        .subscribe(
          (files) => {
            this.files = files.files;
          }
        );
  }
}
