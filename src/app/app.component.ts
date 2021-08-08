import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public itemMenu: any;

  constructor() {
    this.itemMenu = [
      {
        label: 'Home',
        status: false,
        route: 'home'
      },
      {
        label: 'Explorer',
        status: true,
        route: 'explorer'
      },
      {
        label: 'Contact',
        status: false,
        route: 'contact'
      },
      {
        label: 'Sign In',
        status: false,
        route: 'auth/login'
      }
    ];
  }
}
