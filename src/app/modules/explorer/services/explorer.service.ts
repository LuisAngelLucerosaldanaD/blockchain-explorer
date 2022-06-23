import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { map, Observable } from "rxjs";
import { ResponseGetAllBlocks } from "../models/explorer.models";
@Injectable()

export class ExplorerService {
  private urlGetBlocks:string = "https://simbaengine.nexumsign.com:60060/api/v1/blocks/10/1"
  constructor(private _httpClient:HttpClient){

  }
  public getBlocks(): Observable<ResponseGetAllBlocks>{
    return this._httpClient.get<ResponseGetAllBlocks>(this.urlGetBlocks).pipe(map(res=>res))
  }
}

