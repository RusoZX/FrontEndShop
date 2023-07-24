import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable, catchError, of } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private route:ActivatedRoute,
    private productService:ProductService){}

    products = [] as Product[]
    limit = 10;
    search = '';
    mode:string= 'title';
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.search = params['search'];
      });
      this.load();
    }

    load(){
      this.ngxService.start();
      this.getProducts().subscribe((products: any[]) => {
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
      this.ngxService.stop();
    }
    getProducts():Observable<any> {
      switch(this.mode){
        case 'title':
          return this.productService.getByTitle(this.limit,this.search).pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'none':
          return this.productService.getByNone(this.limit).pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'category':
          return this.productService.getByCategory(this.limit,this.search).pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'priceAsc':
          return this.productService.getByPrice(this.limit,'Asc').pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'priceDesc':
          return this.productService.getByPrice(this.limit,'Desc').pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'brand':
          return this.productService.getByBrand(this.limit,this.search).pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'color':
          return this.productService.getByColor(this.limit,this.search).pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
        case 'bestSellers':
          return this.productService.getBestSellers(this.limit).pipe(
            catchError(error => {
              console.error(error);
              this.ngxService.stop();
              this.snackBar.openSnackBar(error?.error.message, 'error');
              this.router.navigate(['error']);
              return of(null);
            })
          );
         
      }
      return of(null);
    }
    goToProductDetails(id: string){
      this.router.navigate(['product/get/'+id]);
    }
    hide() {
      return this.mode === 'priceAsc' || this.mode === 'priceDesc' || this.mode === 'none' || this.mode === 'bestSellers';
    }
  
}
interface Product{
  id: string;
  title: string;
  price: string;
  stock: string;
  image:any;
}
