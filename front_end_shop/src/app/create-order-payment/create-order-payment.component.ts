import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-create-order-payment',
  templateUrl: './create-order-payment.component.html',
  styleUrls: ['./create-order-payment.component.css']
})
export class CreateOrderPaymentComponent {
  constructor(private sharedService:SharedService){

  }
  selectedPaymentMethod: string='card';

  createOrder() {
    if (this.selectedPaymentMethod) {
      console.log(JSON.stringify(this.sharedService.getOrder(this.selectedPaymentMethod)));
    }
  }
}
