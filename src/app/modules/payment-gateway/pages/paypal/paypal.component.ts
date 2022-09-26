import { Component, OnInit } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public paymentForm: FormGroup;
  public acaiValue: number = 1234.0;
  public acaisCanculatedValue:number = 0;

  constructor(private _fb: FormBuilder,) {
    this.paymentForm = _fb.group({
        quantityAcais  : ['', Validators.required],
        valueAcais  : new FormControl(0,[Validators.required]) 
    });
  }

  public payPalConfig ? : IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }
  
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AclpQoAOY_nZjk-C6jySxoJ89SdooNR6O-JHUpYX9VR76-IhG-as1Nsn8fi5z_QCYxtLO2tQ3iTXUXbv',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
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
  public calculateValue(): void {
   console.log("Value acais: ",this.paymentForm.get('quantityAcais')?.value);
   this.acaisCanculatedValue = this.paymentForm.get('quantityAcais')?.value * this.acaiValue;
  }
}
