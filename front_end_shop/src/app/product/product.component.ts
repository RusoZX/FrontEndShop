import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { SharedService } from '../services/shared.service';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private productService:ProductService,
    private cartService: ShoppingCartService,
    private sharedService:SharedService,
    private route: ActivatedRoute){}
    image:any;
    quantity:number=0;
    stock:number=0;
    i=0;
    product = {
      id:'',
      title:'',
      price:'',
      category:'',
      brand:'',
      color:'',
      weight:'',
      volume:'',
      stock:''
    }
    ngOnInit(): void {
      this.ngxService.start();
      this.load();
      this.ngxService.stop();
    }

    load(){
      this.route.params.subscribe(params => {
        const id = params['id']; // Retrieve the value of the 'id' parameter
      
        this.productService.getProduct(id).subscribe((response:any) => {
          this.product.id= response.id;
          this.product.title= response.title;
          this.product.price= response.price;
          this.product.category= response.category;
          this.product.brand= response.brand;
          this.product.color= response.color;
          this.product.weight= response.weight;
          this.product.volume= response.volume;
          this.product.stock= response.stock;
          this.stock= parseInt(this.product.stock,10);
          this.image= `data:image/${response.type};base64,${response.imageData}`;
        },
        error => {
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/']);
          
        });
      });
    }
    validateIntegerInput(event: any) {
      const input = event.target.value;
      const regex = /^[0-9]*$/; 
    
      if (!regex.test(input)) {
        event.target.value = ""; 
      }else{
        this.quantity=parseInt(event.target.value);
      }
    }
    add(){
      this.quantity++;
    }
    remove(){
      this.quantity--;
    }
    addToCart(){
      this.ngxService.start();
      if(localStorage.getItem('logged')==='false'){

      }else{
          this.cartService.add('{"productId":"'+this.product.id+'","quantity":"'+this.quantity+'"}').subscribe((response:any) => {
            this.snackBar.openSnackBar(response.message,'');
            this.ngxService.stop();
          },
          error => {
            console.error(error);
            this.ngxService.stop();
            this.snackBar.openSnackBar(error?.error.message,'error');
            this.router.navigate(['/']);
            
          });
      }
    }
    hideEmployee(){
      return localStorage.getItem('role')!='employee';
    }
    editProduct(){
      this.sharedService.setProduct(this.product);
      this.router.navigate(['employee/editProduct']);
    }
}
