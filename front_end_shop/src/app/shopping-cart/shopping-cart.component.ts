import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {  Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable, catchError, of } from 'rxjs';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private cartService: ShoppingCartService,
    private changeDetector: ChangeDetectorRef){}

    cart = [] as Item[];
    valid=false;
    total= 0.0;
    origQuantities:number[]=[];

    ngOnInit(): void {
        this.ngxService.start();
        this.load();
        this.calculateTotal();
        this.ngxService.stop();
    }
    load(){
      this.getAllItems().subscribe((items: any[]) => {
        this.cart = items.map(item => {
          this.origQuantities.push(parseInt(item.quantity))
          return {
            id: item.id,
            productId: item.productId,
            title: item.title,
            price: item.price,
            stock: parseInt(item.stock),
            quantity: parseInt(item.quantity)
          };
        });
        
      });
      //does not actualize
      this.changeDetector.detectChanges();
    }
    update(){
      console.log(this.cart);
      for(let item of this.cart){
        
        console.log(item.quantity!=this.origQuantities[this.cart.indexOf(item)]);
        if(item.quantity!=this.origQuantities[this.cart.indexOf(item)]){
          this.cartService.edit('{"productId":"'+item.productId+'","quantity":"'+item.quantity+'"}').subscribe(response=>{},
            error => {
            console.error(error);
            this.snackBar.openSnackBar(error?.error.message, 'error');
            this.router.navigate(['error']);
            return of(null);
          });
          this.origQuantities[this.cart.indexOf(item)] = item.quantity;
        }
      }
    }
    getAllItems():Observable<any> {
      return this.cartService.get().pipe(
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
    calculateTotal(){
      for(let item of this.cart){
        console.log(parseFloat(item.price) * item.quantity);
        this.total+= parseFloat(item.price) * item.quantity;
      }
    }
    validateIntegerInput(event: any, item:Item) {
      const input = event.target.value;
      const regex = /^[0-9]*$/; 
      console.log(input);
      if (!regex.test(input)) {
        event.target.value = ""; 
      }else{
        item.quantity=parseInt(event.target.value);
        console.log(item);
      }
    }
    add(item:Item){
      item.quantity++;
    }
    remove(item:Item){
      item.quantity--;
    }
    removeAll(){
      if(confirm(GlobalConstants.confRemoveItems)){
        this.cartService.removeAll().subscribe(response=>{
          this.load();
        },
          error => {
          console.error(error);
          this.snackBar.openSnackBar(error?.error.message, 'error');
          this.router.navigate(['error']);
          return of(null);
        });
      }
    }
    
}
interface Item{
  id: string;
  productId:string;
  title: string;
  price: string;
  stock: number;
  quantity: number;
}

