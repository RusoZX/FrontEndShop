import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {
  constructor(private orderService: OrderService,
    private router:Router,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private sharedService:SharedService){
      this.sharedService.setPrev(router.url);
    }

  ngOnInit(): void {
      this.load();
  }
  orders=[] as Order[]

  load(){
    this.getAllOrders().subscribe((orders: any[]) => {
      this.orders= orders.map(order => {
        return {
          id: order.id,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          dateCreated: order.dateCreated
        };
      });
    });
  }
  getAllOrders():Observable<any> {
    return this.orderService.getAllClientOrders().pipe(
      catchError(error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message, 'error');
        this.router.navigate(['error']);
        return of(null);
      })
    );
  }
}
interface Order{
  id:'',
  orderStatus:'',
  paymentStatus:'',
  dateCreated:''
}
