import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {isTokenExpired} from "@app/utils/validations/validations";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _router: Router
  ) {}

  canActivate() {
    const token = sessionStorage.getItem('access-token');
    if (token && !isTokenExpired(token)) {
      return true;
    } else {
      this._router.navigateByUrl('/explorer');
      return false;
    }
  }

}
