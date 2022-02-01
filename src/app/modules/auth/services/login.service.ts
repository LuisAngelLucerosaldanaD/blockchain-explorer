import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Login, LoginResponse} from "@app/modules/auth/models/login/login.model";
import {environment} from "@env/environment";
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from "rxjs/operators";
import {Token} from "@app/modules/auth/models/login/login.model";
import {EnvServiceProvider} from "@app/env/env.service.provider";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new BehaviorSubject('');
  private loginUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
  }

  public login(authData: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, authData).pipe(map((res: LoginResponse) => res));
  }

  public logout(): void {
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
    this.loggedIn.next('');
    this.router.navigate(['explorer']);
  }

  public checkToken(): void {
    const token = sessionStorage.getItem('access-token');
    if (token !== '' && token !== null) {
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        sessionStorage.removeItem('access-token');
        this.loggedIn.next('');
      } else {
        this.loggedIn.next(token);
      }
    } else {
      this.loggedIn.next('');
    }
  }

  public saveToken(token: Token): void {
    sessionStorage.setItem('access-token', token.access_token);
    sessionStorage.setItem('refresh-token', token.refresh_token);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocured retrienving data';
    if (err) {
      errorMessage = `Error:code ${err.message}`;
    }
    return throwError(errorMessage);

  }

  public getUserByToke(): any {
    let user: any;
    const token = sessionStorage.getItem('access-token');
    if (token) {
      user = helper.decodeToken(token);
    }
    return user;
  }
}

