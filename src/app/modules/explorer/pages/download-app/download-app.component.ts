import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent implements OnInit {
  public isLogged: boolean = false;
  public isMenuBurger: boolean = false;
  constructor() {
    if(sessionStorage.getItem("access-token")) this.isLogged == true;
   }

  ngOnInit(): void {
  }

}
