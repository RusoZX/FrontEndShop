import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit {
  constructor(private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private productService:ProductService,
    private sharedService:SharedService){
      this.sharedService.setPrev(this.router.url);
    }

    products = [] as Product[]

    ngOnInit(): void {
      this.ngxService.start();
      this.load();
      this.ngxService.stop();
    }

    load(){
      this.getAllProducts(10).subscribe((products: any[]) => {
        this.products = products.map(product => {
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            stock: product.stock,
            image: `data:image/${product.type};base64,${product.imageData}`
          };
        });
      });

    }
    getAllProducts(limit: number):Observable<any> {
      return this.productService.getBestSellers(limit).pipe(
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
interface Product{
  id: string;
  title: string;
  price: string;
  stock: string;
  image:any;
}
