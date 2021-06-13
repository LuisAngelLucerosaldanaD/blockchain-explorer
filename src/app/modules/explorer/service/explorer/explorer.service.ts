import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {ResponseGetBlocks} from "@app/modules/explorer/models/explorer/explorer.model";

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  constructor(private httpClient: HttpClient) { }

  public GetBlocks(body: any, URL: string): Observable<ResponseGetBlocks> {
    const json = JSON.stringify(body);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<ResponseGetBlocks>(environment.api + URL, json, {headers: header});
  }

  public GetBlocksById(body: any, URL: string): Observable<ResponseGetBlocks> {
    const json = JSON.stringify(body);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<ResponseGetBlocks>(environment.api + URL + URL, json, {headers: header});
  }
}
