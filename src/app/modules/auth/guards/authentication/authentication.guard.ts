import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {validToken} from "@app/utils/validations/validations";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _router: Router
  ) {}

  canActivate() {
    const token = sessionStorage.getItem('access-token');
    if (token && !validToken(token)) {
      return true;
    } else {
      this._router.navigateByUrl('/explorer');
      return false;
    }
  }

}
