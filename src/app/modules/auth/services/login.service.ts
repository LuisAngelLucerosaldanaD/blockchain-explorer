import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Login, LoginResponse} from "@app/modules/auth/models/login/login.model";
import {environment} from "@env/environment";
import {JwtHelperService} from '@auth0/angular-jwt';
import {catchError, map} from "rxjs/operators";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
  }

  get isLogged$(): Observable<any> {
    return this.loggedIn.asObservable();
  }

  get loggedInValue(): string {
    return this.loggedIn.getValue();
  }

  public login(authData: Login): Observable<LoginResponse | void> {
    const url = `${environment.API_URL}/api/v1/login`;
    return this.http
      .post<LoginResponse>(url, authData)
      .pipe(map((res: LoginResponse) => {
          this.saveToken(res.data);
          this.loggedIn.next(res.data);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  public logout(): void {
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
    this.loggedIn.next('');
    this.router.navigate(['auth/login']);
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

  private saveToken(token: any): void {
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
  public getUserByToke(): any{
    let user: any;
    const token =  sessionStorage.getItem('access-token');
    if (token) {
      user = helper.decodeToken(token);
    }
    return user;
  }
}

