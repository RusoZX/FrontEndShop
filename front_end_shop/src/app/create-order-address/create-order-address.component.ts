import { Component,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-create-order-address',
  templateUrl: './create-order-address.component.html',
  styleUrls: ['./create-order-address.component.css']
})
export class CreateOrderAddressComponent implements OnInit{
  constructor(private userService:UserService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private sharedService:SharedService){
        //Here we have a list of the permited routes
        const listRoutes=['/cart/get']
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

  addresses=true;
  shops=false;
  direction=['Street España N.242','Street Catalunya N.76','Street Andalucia N.14','Street Rambla 2'];
  shopValue:number=0;
  addressesList=[] as Address[];
  selectedAddress:number=0;
  ngOnInit(): void {
    this.load();
  }
  load(){
    this.getAllAddress().subscribe((addresses: any[]) => {
      this.addressesList = addresses.map(address => {
        return {
          id: address.id,
          city: address.city,
          street: address.street
        };
      });
    });
  }
  getAllAddress(): Observable<any> {
    return this.userService.getAllAddresses().pipe(
      catchError(error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message, 'error');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
  nextStep(){
    if(this.addresses)
      this.sharedService.setOrderAddress('delivery',this.selectedAddress);
    else
      this.sharedService.setOrderAddress('shop',this.shopValue+1);
    this.router.navigate(['createOrder/payment']);
  }
  toggleAddresses(){
    this.addresses=true;
    this.shops=false;
  }
  toggleShops(){
    this.addresses=false;
    this.shops=true;
  }
}
interface Address {
  id: string;
  city: string;
  street: string;
}
