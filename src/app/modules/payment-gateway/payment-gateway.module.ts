import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGatewayRoutingModule } from './payment-gateway-routing.module';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { PaymentService } from './services/payment.service';

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
    ReactiveFormsModule,
    TranslateModule
  ],
  providers:[PaymentService]
})
export class PaymentGatewayModule { }
