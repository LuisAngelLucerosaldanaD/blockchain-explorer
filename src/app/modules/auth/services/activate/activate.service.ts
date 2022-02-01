import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {ActivateAccountModel, ActivateAccountResponse, LoginResponse} from "@app/modules/auth/models/login/login.model";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {EnvServiceProvider} from "@app/env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  private readonly activateAccountUrl: string;
  private readonly activateWalletUrl: string;
  private readonly token: string;

  constructor(
    private http: HttpClient,
  ) {
    const routeParam = new URL(document.location.href);
    this.token = routeParam.searchParams.get('token') || '';
    this.activateAccountUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/user/activate';
    this.activateWalletUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/wallet/activate';
  }

  public activateAccount(data: ActivateAccountModel): Observable<ActivateAccountResponse> {
    return this.http
      .post<ActivateAccountResponse>(this.activateAccountUrl, data, {
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
      .pipe(map((res) => res),
        catchError((err) => this.handlerError(err))
      );
  }

  public activateWallet(data:any): Observable<ActivateAccountResponse> {
    return this.http
      .post<ActivateAccountResponse>(this.activateWalletUrl, data, {
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
      .pipe(map((res) => res),
        catchError((err) => this.handlerError(err))
      );
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocured retrienving data';
    if (err) {
      errorMessage = `Error:code ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
