import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {  Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable, catchError, of } from 'rxjs';
import { GlobalConstants } from '../global-constants';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {
  constructor(private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private cartService: ShoppingCartService,
    private sharedService: SharedService){
      this.sharedService.setPrev(this.router.url);
    }

    cart = [] as Item[];
    total= 0.0;
    origQuantities:number[]=[];

    ngOnInit(): void {
        this.ngxService.start();
        this.load();
        this.ngxService.stop();
    }
    ngOnDestroy(): void {
        this.update();
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
        this.calculateTotal();
        
      });
    }
    update(){
      for(let item of this.cart){
        if(item.quantity!=this.origQuantities[this.cart.indexOf(item)]&&!Number.isNaN(item.quantity)){
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
      }
    }
    add(item:Item){
      item.quantity++;
    }
    remove(item:Item){
      item.quantity--;
      if(item.quantity==0)
        this.removeItem(item);
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
    removeItem(item: Item){
      if(confirm(GlobalConstants.confRemoveItem)){
        this.cartService.remove(item.productId).subscribe(response=>{
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
    badQuantity(){
      for(let item of this.cart){
        if(item.quantity<=0||item.quantity>item.stock||Number.isNaN(item.quantity))
          return true;
      }
      return false;
    }
    valid(item:Item){
      return item.quantity>item.stock;
    }
    createOrder(){
      this.sharedService.setGoods(this.createJson());
      this.router.navigate(['createOrder/address']);
    }
    createJson():string{
      var result:string ="[";
      for(let item of this.cart){
        result= result + '{"productId":"'+item.productId+'","quantity":"'+item.quantity+'"},'
      }
    
      result = result.slice(0, -1) + "]";
      return result;
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

