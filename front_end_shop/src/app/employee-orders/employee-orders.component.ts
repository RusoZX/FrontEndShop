import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css']
})
export class EmployeeOrdersComponent implements OnInit {
  constructor(private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private orderService:OrderService,
    private sharedService:SharedService){
      this.sharedService.setPrev(this.router.url);
      if(localStorage.getItem('role')!=='employee'){
        this.snackBar.openSnackBar('BAD ACCESS','error');
        this.router.navigate(['/']);
      }
    }
    totalRevenue=0.0;
    orders = [] as Order[];
    mode:string='none';
    search:string='';
    ngOnInit(): void {
      this.load();
    }

    load(){
      this.totalRevenue=0.0;
      this.ngxService.start();
      this.getOrders().subscribe((orders:any[])=>{
        this.orders= orders.map(order =>{
          this.totalRevenue+=parseFloat(order.totalRevenue);
          return{
            id:order.id,
            userName:order.userName,
            paymentStatus:order.paymentStatus,
            orderStatus:order.orderStatus,
            createdDate:order.createdDate,
            totalRevenue:order.totalRevenue
          };
        });
      });
      this.ngxService.stop();
    }
    hide(){
      return this.mode !== 'byUser';
    }
    getOrders():Observable<any> {
      return this.orderService.getEmployeeOrders(this.mode,this.search).pipe(
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
  userName:'',
  paymentStatus:'',
  orderStatus:'',
  createdDate:'',
  totalRevenue:''
}
