import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login, LoginResponse, Token} from "@app/modules/auth/models/login";
import {map, Observable} from "rxjs";
import {EnvServiceProvider} from "@app/services/env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/login';

  constructor(
    private http: HttpClient,
  ) { }

  public login(authData: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, authData).pipe(map((res: LoginResponse) => res));
  }

  public saveToken(token: Token): void {
    sessionStorage.setItem('access-token', token.access_token);
    sessionStorage.setItem('refresh-token', token.refresh_token);
  }

}
