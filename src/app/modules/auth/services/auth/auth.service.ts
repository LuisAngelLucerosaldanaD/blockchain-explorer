import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account, ResponseCreateAccount, ResponseCreateWallet} from "@app/modules/auth/models/register/register";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {EnvServiceProvider} from "@app/env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly createAccountUrl: string;
  private readonly createWalletUrl: string;
  private readonly token: string;

  constructor(private _http: HttpClient) {
    this.createAccountUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/user/create';
    this.createWalletUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/wallet/create';
    this.token = '';
  }

  public createAccount(account: Account): Observable<ResponseCreateAccount> {
    return this._http.post<ResponseCreateAccount>(this.createAccountUrl, account).pipe(map((res) => res));
  }

  public createWallet(): Observable<ResponseCreateWallet> {
    return this._http.post<ResponseCreateWallet>(this.createWalletUrl, {}, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    }).pipe(map((res) => res));
  }
}
