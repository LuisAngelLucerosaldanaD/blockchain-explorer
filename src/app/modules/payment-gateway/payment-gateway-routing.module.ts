import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { PaymentGatewayComponent } from './payment-gateway.component';

const routes: Routes = [
  {
    path:"",
    component:PaymentGatewayComponent
  },
  {
    path:"paypal",
    component:PaypalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentGatewayRoutingModule { }
