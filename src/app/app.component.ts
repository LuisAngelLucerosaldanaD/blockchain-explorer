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
    this.locateUrl();
  }

  public goToRute(route: string): void {
    const findRoutePosition = this.itemMenu.map((item: any) => item.route).indexOf(route);
    if (findRoutePosition !== -1) {
      this.itemMenu[findRoutePosition].status = true;
      this.itemMenu = this.itemMenu.map((item: any) => {
        if (item.route !== route) {
          item.status = false;
          return item;
        } else {
          return item;
        }
      });
    }
  }

  public locateUrl(): void {
    const url = new URL(document.location.href);
    const urlPath = url.pathname.replace('/', '');
    const findRoutePosition = this.itemMenu.map((item: any) => item.route).indexOf(urlPath);

    if (findRoutePosition !== -1) {
      this.itemMenu[findRoutePosition].status = true;
      this.itemMenu = this.itemMenu.map((item: any) => {
        if (item.route !== urlPath) {
          item.status = false;
          return item;
        } else {
          return item;
        }
      });
    }
  }
}
