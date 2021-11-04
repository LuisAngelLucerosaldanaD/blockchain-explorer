import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {
  PaginationModel,
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
  private urlGetBlockById: string;
  private urlGetBlocks: string;

  constructor(private httpClient: HttpClient) {
    this.urlTransactionCredential = environment.API_URL + '/api/v1/transaction/';
    this.urlAppKey = environment.API_URL + '/api/v1/key/';
    this.urlGetBlockById = environment.API_URL + 'block/id';
    this.urlGetBlocks = environment.API_URL + '/api/v1/blocks';
  }

  public GetBlocks(pagination: PaginationModel): Observable<ResponseGetBlocks> {
    return this.httpClient.get<ResponseGetBlocks>(this.urlGetBlocks + `/${pagination.offset}/${pagination.limit}`).pipe(map((res) => res));
  }

  public GetBlocksById(body: any): Observable<ResponseGetBlocks> {
    return this.httpClient.post<ResponseGetBlocks>(this.urlGetBlockById, body).pipe(map((res) => res));
  }

  public getTransactionOfCredential(transactionId: string, blockId: number): Observable<ResponseGetTransactionByID> {
    return this.httpClient.get<ResponseGetTransactionByID>(this.urlTransactionCredential + transactionId + `/${blockId}`).pipe(map((res) => res));
  }

  public getAppId(): Observable<ResponseGetAppKey> {
    return this.httpClient.get<ResponseGetAppKey>(this.urlAppKey + '027dfc14-d847-4627-9f7f-ecb5d6ef06fa').pipe(map((res) => res));
  }

}
