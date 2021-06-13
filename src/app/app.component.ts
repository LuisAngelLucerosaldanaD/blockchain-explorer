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
        route: ''
      },
      {
        label: 'Explorer',
        status: true,
        route: ''
      },
      {
        label: 'App',
        status: false,
        route: ''
      },
      {
        label: 'Offers',
        status: false,
        route: ''
      }
      ,
      {
        label: 'Contact',
        status: false,
        route: ''
      }
      ,
      {
        label: 'Register',
        status: false,
        route: ''
      },
      {
        label: 'Sign In',
        status: false,
        route: ''
      }
    ]
  }
}
