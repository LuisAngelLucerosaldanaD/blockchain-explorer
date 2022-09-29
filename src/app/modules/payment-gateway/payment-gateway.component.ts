import { Component, OnInit } from '@angular/core';
import { OrderBuyAcais, ItemOrder } from './models/paypal';
import {ToastService} from "ecapture-ng-ui";
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {

  public isMenuBurger: boolean = false;
  public isModalPayPal: boolean = false;
  
  public currency: string = "USD";
  public symbolCurrency: string = "$";
  public valueAcai: number = 0.20;
  
  public valueQuantityAcai = 0;
  public valueQuantityCurrency = 0;
  
  public valueCalculatedQuantyty: number = this.valueQuantityAcai * (Number(this.valueAcai)*1);
  public order: OrderBuyAcais = {
    price: 0,
    quantity: 0,
    unit_price: 0
  }
  public orderAcaisPaypal!: ItemOrder;
  constructor(
    private _messageService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  public addCryptoCurrency(quantity: number): void {

  }
  public buyAcais(): void {
    this.order.price = this.valueQuantityCurrency;
    this.order.quantity = this.valueQuantityAcai;
    this.order.unit_price = this.valueAcai;

  }

  addAcaiValue(event: any) {
    if(event.target.value>0){
      this.valueQuantityAcai = event.target.value;
      this.valueQuantityCurrency = Number((this.valueQuantityAcai * this.valueAcai).toFixed(2));
    }
  }

  addCurrencyValue(event: any) {
    console.log(event.target.value);
    if(event.target.value>0){
      this.valueQuantityCurrency = event.target.value;
      this.valueQuantityAcai = Number((this.valueQuantityCurrency / this.valueAcai).toFixed(2));
    }
  }

  addValue(type: string): void {
    if(type === "currency") {
      this.valueQuantityCurrency++;
      this.valueQuantityAcai = this.valueQuantityCurrency / this.valueAcai;
    }
    else {
      this.valueQuantityAcai++;
      this.valueQuantityCurrency = this.valueQuantityAcai * this.valueAcai;
    }
  }
  
  substraValue(type: string): void {
    if(type === "currency" && this.valueQuantityCurrency > 0) {
      this.valueQuantityCurrency--;
      this.valueQuantityAcai = this.valueQuantityCurrency / this.valueAcai;
    }
    else if (this.valueQuantityAcai > 0) {
      this.valueQuantityAcai--;
      this.valueQuantityCurrency = this.valueQuantityAcai * this.valueAcai;
    }
}
}
