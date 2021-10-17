import { Component, OnInit } from '@angular/core';
import {MenuModel} from "@app/models/ui.model";
import {MENU_DATA_ITEMS} from "@app/utils/constants/carousel.data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public itemMenu: MenuModel[];

  constructor(
    private _route: Router
  ) {
    this.itemMenu = MENU_DATA_ITEMS;
    this.locateUrl();
  }

  ngOnInit(): void {
  }


  public locateUrl(): void {
    const url = new URL(document.location.href);
    const urlPath = url.pathname.replace('/', '');
    this.findRouteAndChangeStatus(urlPath);
  }

  public findRouteAndChangeStatus(urlPath: string): void {
    const routePosition = this.itemMenu.map((item: any) => item.route).indexOf(urlPath);
    if (routePosition !== -1) {
      this.itemMenu[routePosition].status = true;
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

  public goToUrl(urlPath: string): void {
    this._route.navigateByUrl(urlPath).then(
      (res) => {
        if (res) this.findRouteAndChangeStatus(urlPath);
      }
    );
  }

}
