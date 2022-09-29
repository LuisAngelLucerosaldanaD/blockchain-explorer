import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {EnvServiceProvider} from "@app/services/env/env.service.provider";

import { PaymentData, PaymentDataResponse } from '../models/paypal';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  private reportPayment = EnvServiceProvider.useFactory().REST_API + '/api/v1/payment';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  
  public paymentSuccess(paymentData: PaymentData): Observable<PaymentDataResponse> {
    return this.http.post<PaymentDataResponse>(this.reportPayment, paymentData).pipe(map((res: PaymentDataResponse) => res));
  }
}