import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {validToken} from "@app/utils/validations/validations";

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {
  constructor(
    private _router: Router
  ) {}

  canActivate(
    routeActivate: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeParam = new URL(document.location.href);
    const token = routeParam.searchParams.get('token');
    if (token) {
      return true;
    } else {
      this._router.navigate(['/home'])
      return false;
    }
  }

}
