import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {
  ResponseGetAppKey,
  ResponseGetBlocks,
  ResponseGetTransactionByID
} from "@app/modules/explorer/models/explorer/explorer.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  private urlTransactionCredential: string;
  private urlAppKey: string;

  constructor(private httpClient: HttpClient) {
    this.urlTransactionCredential = environment.API_URL + '/api/v1/transaction/';
    this.urlAppKey = environment.API_URL + '/api/v1/key/';
  }

  public GetBlocks(body: any, URL: string): Observable<ResponseGetBlocks> {
    const json = JSON.stringify(body);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<ResponseGetBlocks>(environment.API_URL + URL, json, {headers: header});
  }

  public GetBlocksById(body: any, URL: string): Observable<ResponseGetBlocks> {
    const json = JSON.stringify(body);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<ResponseGetBlocks>(environment.API_URL + URL + URL, json, {headers: header});
  }

  public getTransactionOfCredential(transactionId: string, blockId: number): Observable<ResponseGetTransactionByID> {
    return this.httpClient.get<ResponseGetTransactionByID>(this.urlTransactionCredential + transactionId + `/${blockId}`).pipe(map((res) => res));
  }

  public getAppId(): Observable<ResponseGetAppKey> {
    return this.httpClient.get<ResponseGetAppKey>(this.urlAppKey + '027dfc14-d847-4627-9f7f-ecb5d6ef06fa').pipe(map((res) => res));
  }

}
