import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export class EnvService {
  public REST_API = 'https://sandbox.btigersystem.net/blion/dev/consenso/';
  public URL_PAGE = '';

  public enableDebug = true;

  constructor() {
  }

}
