import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

import { OrderService } from '../services/order.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-employee-order',
  templateUrl: './employee-order.component.html',
  styleUrls: ['./employee-order.component.css']
})
export class EmployeeOrderComponent implements OnInit{
  constructor(private route: ActivatedRoute,
    private orderService:OrderService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private sharedService:SharedService){
        //Here we have a list of the permited routes
        const listRoutes=['/employee/orders']
          const lastRoute = this.sharedService.getPrev();
          this.sharedService.setPrev(this.router.url);
          var ok=false;
          for(let route of listRoutes){
            if(lastRoute.startsWith(route))
              ok=true;
          }
          if(!ok&&localStorage.getItem('role')!=='employee'){
            this.snackBar.openSnackBar('BAD ACCESS','error');
            this.router.navigate(['/']);
          }
        
    }

    order={
      id:'',
      orderStatus:'',
      paymentStatus:'',
      paymentMethod:'',
      deliveryMethod:'',
      createdDate:''
    };
    ngOnInit(): void {
      this.load();
    }
    load(){
      this.route.params.subscribe(params => {
        const id = params['id']; // Retrieve the value of the 'id' parameter
      
        this.orderService.getClientOrder(id).subscribe((response:any) => {
          this.order.id=id
          this.order.orderStatus=response.orderStatus;
          this.order.paymentStatus=response.paymentStatus;
          this.order.paymentMethod=response.paymentMethod;
          this.order.deliveryMethod=response.deliveryMethod;
          this.order.createdDate=response.dateCreated;
        },
        error => {
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/']);
          
        });
      });
    }
    updatePayment(){
      this.ngxService.start();
      this.orderService.updateOrder('{"orderId":"'+this.order.id+'","update":"payment","updateData":"true"}').subscribe((response:any)=>{
        this.snackBar.openSnackBar(response.message,'');
        this.load();
        this.ngxService.stop();
      },error=>{
        console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/']);
      });
    }
    updateStatus(){
      this.ngxService.start();
      this.orderService.updateOrder('{"orderId":"'+this.order.id+'","update":"status","updateData":"'+this.nextStatus()+'"}').subscribe((response:any)=>{
        this.snackBar.openSnackBar(response.message,'');
        this.load();
        this.ngxService.stop();
      },error=>{
        console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/']);
      });
    }
    valid(){
      return this.order.orderStatus!=='delivered';
    }
    nextStatus(){
      return GlobalConstants.statusArray[GlobalConstants.statusArray.indexOf(this.order.orderStatus)+1];
    }

}
