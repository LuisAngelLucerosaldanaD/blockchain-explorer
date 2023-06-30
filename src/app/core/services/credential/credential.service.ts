import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Response} from "@app/core/models/response";
import {CredentialShared} from "@app/core/models/credential";

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(
    private _http: HttpClient
  ) {
  }

  public getCredential(url: string, password: string): Observable<Response<CredentialShared[]>> {
    return this._http.get<Response<CredentialShared[]>>(url + `/${password}`).pipe(map(res => res));
  }
}
