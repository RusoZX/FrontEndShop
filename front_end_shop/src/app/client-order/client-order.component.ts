import { Component , OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { Observable, catchError, of } from 'rxjs';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {
  constructor(private orderService: OrderService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService){}

  ngOnInit(): void {
    this.ngxService.start();
    this.load();
    this.ngxService.stop();
  }
  order={
    orderStatus:'',
    paymentStatus:'',
    paymentMethod:'',
    deliveryMethod:''
  };
  address={
    id:'',
    city:'',
    street:''
  };
  goods= [] as Item[];

  load(){
    this.route.params.subscribe(params => {
      const id = params['id']; // Retrieve the value of the 'id' parameter
    
      this.orderService.getClientOrder(id).subscribe((response:any) => {
        this.order.orderStatus=response.orderStatus;
        this.order.paymentStatus=response.paymentStatus;
        this.order.paymentMethod=response.paymentMethod;
        this.order.deliveryMethod=response.deliveryMethod;

        this.userService.getAddress(response.addressId).subscribe((addressResponse:any)=>{
          this.address.id=addressResponse.addressId;
          this.address.city=addressResponse.city;
          this.address.street=addressResponse.street;
        },
        error => {
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/']);
          
        });
        this.getGoods(id).subscribe((goods: any[]) => {
          this.goods= goods.map(item => {
            return {
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity
            };
          });
        });
      },
      error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message,'error');
        this.router.navigate(['/']);
        
      });
    });
  }
  getGoods(id:string):Observable<any> {
    return this.orderService.getGoods(id).pipe(
      catchError(error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message, 'error');
        this.router.navigate(['error']);
        return of(null);
      })
    );
  }
  goToProductDetails(id: string){
    this.router.navigate(['product/get/'+id]);
  }

}
interface Item{
  id:'',
  title:'',
  price:'',
  quantity:''
}
