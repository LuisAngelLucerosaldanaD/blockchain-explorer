import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGatewayRoutingModule } from './payment-gateway-routing.module';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PaymentGatewayComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    PaymentGatewayRoutingModule,
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentGatewayModule { }
