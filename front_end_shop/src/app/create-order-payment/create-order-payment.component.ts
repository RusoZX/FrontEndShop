import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { OrderService } from '../services/order.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationEnd, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../global-constants';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-create-order-payment',
  templateUrl: './create-order-payment.component.html',
  styleUrls: ['./create-order-payment.component.css']
})
export class CreateOrderPaymentComponent {
  constructor(private sharedService:SharedService,
    private orderService: OrderService,
    private router:Router,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private cartService:ShoppingCartService){
        //Here we have a list of the permited routes
        const listRoutes=['/createOrder/address']
          const lastRoute = this.sharedService.getPrev();
          this.sharedService.setPrev(this.router.url);
          var ok=false;
          for(let route of listRoutes){
            if(lastRoute.startsWith(route))
              ok=true;
          }
          if(!ok){
            this.snackBar.openSnackBar('BAD ACCESS','error');
            this.router.navigate(['/']);
          }
        
  }
  selectedPaymentMethod: string='card';

  createOrder() {
    if (this.selectedPaymentMethod) {
      this.orderService.createOrder(JSON.stringify(this.sharedService.getOrder(this.selectedPaymentMethod)))
      .subscribe(response=>{
        this.cartService.removeAll().subscribe(response=>{
          this.ngxService.stop();
          this.snackBar.openSnackBar(GlobalConstants.orderCreated,'');
          this.router.navigate(['/']);
        }, 
        error=>{
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message, 'error');
          this.router.navigate(['error']);
        });
      },
      error=>{
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message, 'error');
        this.router.navigate(['error']);
      })
    }
  }
}
