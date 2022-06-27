import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {map, Observable} from "rxjs";
import {ResponseGetAllBlocks, ResponseGetFiles} from "../models/explorer.models";
import {ResponseGetTransactionByID} from "../models/data-viewer";

@Injectable()

export class ExplorerService {
  private urlGetBlocks: string = "https://simbaengine.nexumsign.com:60060/api/v1/blocks";
  private urlTransactionById: string = 'https://simbaengine.nexumsign.com:60060/api/v1/transaction';
  private urlGetFilesByTransactionID = 'https://simbaengine.nexumsign.com:60060/api/v1/transaction/files';

  constructor(private _httpClient: HttpClient) {

  }

  public getBlocks(limit: number, offset: number): Observable<ResponseGetAllBlocks> {
    return this._httpClient.get<ResponseGetAllBlocks>(this.urlGetBlocks + `/${limit}/${offset}`).pipe(map(res => res))
  }

  public getTransactionById(id: string, blockId: number): Observable<ResponseGetTransactionByID> {
    return this._httpClient.get<ResponseGetTransactionByID>(this.urlTransactionById + `/${id}/${blockId}`).pipe(map((res) => res));
  }

  public getFilesByTransactionID(transactionID: string): Observable<ResponseGetFiles> {
    return this._httpClient.post<ResponseGetFiles>(this.urlGetFilesByTransactionID, {
      transaction_id: transactionID
    }).pipe(map((res) => res));
  }


}

