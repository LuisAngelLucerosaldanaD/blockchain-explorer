import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGatewayRoutingModule } from './payment-gateway-routing.module';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    PaymentGatewayComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    PaymentGatewayRoutingModule,
    NgxPayPalModule
  ]
})
export class PaymentGatewayModule { }
