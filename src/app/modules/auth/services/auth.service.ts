import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Login, LoginResponse, Token} from "@app/modules/auth/models/login";
import {BehaviorSubject, map, Observable} from "rxjs";
import {EnvServiceProvider} from "@app/services/env/env.service.provider";
import {Account, ResponseCreateAccount, ResponseCreateWallet} from "@app/modules/auth/models/register";
import { RecoveryPassword, RecoveryPasswordResponse, DataPassword, ResetPasswordResponse, Code} from '@app/modules/auth/models/recoveryAccount';
import {DeleteAccount, DeleteAccountResponse} from '@app/modules/auth/models/deleteAccount';
import { ChangePasswordRequest, ChangePasswordResponse } from '@app/modules/auth/models/changePassword';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject('');
  private loginUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/login';
  private registerUserUrl = EnvServiceProvider.useFactory().REST_API + 'api/v1/user/create';
  private recoveryAccountUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/recovery';
  private deleteAccountUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/user/delete';
  private changePasswordUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/user/change-pwd';
  private resetPasswordUrl = EnvServiceProvider.useFactory().REST_API + '/api/v1/user/request-change-pwd';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public login(authData: Login): Observable<LoginResponse> {
    console.log("Data login: ",authData, "\n",this.loginUrl);
    return this.http.post<LoginResponse>(this.loginUrl, authData).pipe(map((res: LoginResponse) => res));
  }
  public createUser(userData: Account): Observable<ResponseCreateAccount> {
    return this.http.post<ResponseCreateAccount>(this.registerUserUrl, userData).pipe(map((res: ResponseCreateAccount) => res));
  }
  public recoveryPassword(recoveryData: RecoveryPassword):Observable<RecoveryPasswordResponse> {
    return this.http.post<RecoveryPasswordResponse>(this.recoveryAccountUrl, recoveryData).pipe(map((res: RecoveryPasswordResponse) => res));
  }
  public checkCodeRecoveryPassword(code: Code):Observable<RecoveryPasswordResponse> {
    return this.http.post<RecoveryPasswordResponse>(this.recoveryAccountUrl, code).pipe(map((res: RecoveryPasswordResponse) => res));
  }
  public resetPassword(recoveryData: DataPassword):Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(this.recoveryAccountUrl, recoveryData).pipe(map((res: ResetPasswordResponse) => res));
  }
  public changePassword(changePasswordData: ChangePasswordRequest):Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(this.changePasswordUrl, changePasswordData).pipe(map((res: ChangePasswordResponse) => res));
  }
  public deleteAccount(deleteAccount: DeleteAccount):Observable<DeleteAccountResponse> {
    return this.http.post<DeleteAccountResponse>(this.deleteAccountUrl, deleteAccount).pipe(map((res: DeleteAccountResponse) => res));
  }
  public saveToken(token: Token): void {
    sessionStorage.setItem('access-token', token.access_token);
    sessionStorage.setItem('refresh-token', token.refresh_token);
  }
  public logout(): void {
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
    this.loggedIn.next('');
    this.router.navigate(['explorer']);
  }
}
