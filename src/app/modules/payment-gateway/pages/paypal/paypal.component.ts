import {Component, Input, OnInit} from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { OrderBuyAcais, ItemOrder } from '../../models/paypal';
import {Subscription} from "rxjs";
import {ToastService} from "ecapture-ng-ui";
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { PaymentData } from '../../models/paypal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  @Input() isModalPayPal = false;
  @Input('order') order!: OrderBuyAcais;

  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public acaiValue: number = 1234.0;
  public acaisCanculatedValue:number = 0;
  
  public orderAcaisPaypal!: ItemOrder;
  
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _paymentService: PaymentService,
    private _router: Router
    ) {
  }

  public payPalConfig ? : IPayPalConfig;

  ngOnInit(): void {
    console.log("Orden: ",this.order);
    this.initConfig();
  }
  /*
  {
                amount: {
                    currency_code: 'USD',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '9.99',
                    },
                }]
            }
  */
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AclpQoAOY_nZjk-C6jySxoJ89SdooNR6O-JHUpYX9VR76-IhG-as1Nsn8fi5z_QCYxtLO2tQ3iTXUXbv',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: String(this.order.price),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: String(this.order.price)
                        }
                    }
                },
                items: [{
                    name: 'Acais Cryptocurrency',
                    quantity: String(this.order.quantity),
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: String(this.order.unit_price),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
            //const dataPayment: PaymentData = this.formatRequestPayment(data,"success");
            //this.paymentAcreditation(dataPayment);
            this._router.navigate(['explorer']);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
  }
  private resetStatus(): void {
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  public formatOrder(): void {
    this.orderAcaisPaypal = {
        amount: {
            currency_code:"USD",
            value: String(this.order.price)
        },
        items: [{
            name:"BUY ACAYS",
            quantity:String(this.order.quantity),
            category:"DIGITAL_GOODS",
            unit_amount:{
                currency_code:"USD",
                value:String(this.order.price)
            }
        }]

    };
  }

  public paymentAcreditation(data: PaymentData): void {
    this._subscriptions.add(
        this._paymentService.paymentSuccess(data).subscribe({
          next: async (resp) => {
            if (resp.error) {
              this._messageService.add({type: 'error', message: resp.msg, life: 5000});
            } else {
                this._messageService.add({type: 'success', message: 'Proceso exitoso', life: 5000});
              await this._router.navigate(['explorer']);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            this._messageService.add({type: 'error', message: "Error on process", life: 5000});
          }
        }));
  }

  public formatRequestPayment(data: any, status:string):  PaymentData{
    return {
        acais_quantity: this.order.quantity,
        amount:this.order.price,
        paypal_response:data,
        status,
        user_data:"1231245235"
    };
  }
}
