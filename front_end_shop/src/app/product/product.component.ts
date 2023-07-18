import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

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
    private route: ActivatedRoute){}
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
        },
        error => {
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/']);
          
        });
      });
    }
}
