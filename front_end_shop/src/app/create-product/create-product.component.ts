import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, Validators, FormBuilder,AbstractControl, ValidatorFn } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{
  constructor(private productService:ProductService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private fb:FormBuilder,
    private sharedService:SharedService){
        this.sharedService.setPrev(this.router.url);
          if(localStorage.getItem('role')!=='employee'){
            this.snackBar.openSnackBar('BAD ACCESS','error');
            this.router.navigate(['/']);
          }
        
    }
    createNew=false;
    categories:string[]=[];
    product = {
      title:'',
      category:'',
      price:'',
      brand:'',
      color:'',
      weight:'',
      volume:'',
      stock:''
    }
    productForm = this.fb.group({
      'title': ['', Validators.required],
      'category': ['', Validators.required],
      'price': ['', [Validators.required, Validators.min(0.1)]],
      'brand': ['', Validators.required],
      'color': ['', Validators.required],
      'weight': ['', [Validators.required, Validators.min(0.1)]],
      'volume': ['', [Validators.required, Validators.min(0.1)]],
      'stock': ['', [Validators.required, positiveIntegerValidator()]],
    });
    get title(){
      return this.productForm.get('title') as FormControl;
    }
    get category(){
      return this.productForm.get('category') as FormControl;
    }
    get price(){
      return this.productForm.get('price') as FormControl;
    }
    get brand(){
      return this.productForm.get('brand') as FormControl;
    }
    get color(){
      return this.productForm.get('color') as FormControl;
    }
    get weight(){
      return this.productForm.get('weight') as FormControl;
    }
    get volume(){
      return this.productForm.get('volume') as FormControl;
    }
    get stock(){
      return this.productForm.get('stock') as FormControl;
    }
    ngOnInit(): void {
        this.getAllCategories().subscribe((categories: string[]) => {
          this.categories= categories;
          this.productForm.get('category')?.setValue(categories[0]);
        });
        
        
    }
    getAllCategories():Observable<any> {
      return this.productService.getCategories().pipe(
        catchError(error => {
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message, 'error');
          this.router.navigate(['error']);
          return of(null);
        })
      );
    }
    create(){
      (this.productForm.get('price') as FormControl).setValue( parseFloat((this.productForm.get('price') as FormControl).value).toFixed(2));
      (this.productForm.get('weight') as FormControl).setValue( parseFloat((this.productForm.get('weight') as FormControl).value).toFixed(2));
      (this.productForm.get('volume') as FormControl).setValue( parseFloat((this.productForm.get('volume') as FormControl).value).toFixed(2));
      this.ngxService.start();
      this.productService.addProduct(JSON.stringify(this.productForm.value)).subscribe((response:any)=>{
        this.snackBar.openSnackBar(response.message,'');
        this.ngxService.stop();
        this.router.navigate(['/']);
      },error=>{
        console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/error']);
      });
    }
    toggleInput() {
      const selectedValue = this.productForm.controls.category.value;
      this.createNew = selectedValue === '';
    }
  }
  function positiveIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
        return { 'positiveInteger': true };
      }
      return null;
    };
  }
