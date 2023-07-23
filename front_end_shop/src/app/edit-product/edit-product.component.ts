import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder,AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  constructor(private productService:ProductService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private fb:FormBuilder,
    private sharedService:SharedService){}
    createNew=false;
    categories:string[]=[];
    product = {
      id:'',
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
        });
        this.product = this.sharedService.getProduct();
        
      if(this.product.id===''){
        this.snackBar.openSnackBar(GlobalConstants.noProduct, 'error');
        this.router.navigate(['/']);
      }else{
        this.ngxService.start();
        const notSameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
            return control.get('title')?.value === this.product.title
            && control.get('category')?.value === this.product.category
            && control.get('price')?.value === this.product.price
            && control.get('brand')?.value === this.product.brand
            && control.get('color')?.value === this.product.color
            && control.get('weight')?.value === this.product.weight
            && control.get('volume')?.value === this.product.volume
            && control.get('stock')?.value === this.product.stock

            ? {same:true} : null;
          };
          this.productForm = this.fb.group({
            'title': [this.product.title, Validators.required],
            'category': [this.product.category, Validators.required],
            'price': [this.product.price, [Validators.required, Validators.min(0.1)]],
            'brand': [this.product.brand, Validators.required],
            'color': [this.product.color, Validators.required],
            'weight': [this.product.weight, [Validators.required, Validators.min(0.1)]],
            'volume': [this.product.volume, [Validators.required, Validators.min(0.1)]],
            'stock': [this.product.stock, [Validators.required, positiveIntegerValidator()]],
          }, { validators: notSameValidator });
          this.ngxService.stop();
    }
        
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
    update(){
      (this.productForm.get('price') as FormControl).setValue( parseFloat((this.productForm.get('price') as FormControl).value).toFixed(2));
      (this.productForm.get('weight') as FormControl).setValue( parseFloat((this.productForm.get('weight') as FormControl).value).toFixed(2));
      (this.productForm.get('volume') as FormControl).setValue( parseFloat((this.productForm.get('volume') as FormControl).value).toFixed(2));
      this.ngxService.start();
      this.productService.updateProduct(this.createJson()).subscribe((response:any)=>{
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
    createJson():string{
      var result:string ="{";
      result = result + '"productId":"'+this.product.id+'",';
      if(this.title.value != this.product.title)
        result= result +'"title":"'+this.title.value+'",';
      if(this.price.value != this.product.price)
        result= result +'"price":"'+this.price.value+'",';
      if(this.category.value != this.product.category)
        result= result +'"category":"'+this.category.value+'",';
      if(this.brand.value != this.product.brand)
        result= result +'"brand":"'+this.brand.value+'",';
      if(this.color.value != this.product.color)
        result= result +'"color":"'+this.color.value+'",';
      if(this.weight.value != this.product.weight)
        result= result +'"weight":"'+this.weight.value+'",';
      if(this.volume.value != this.product.volume)
        result= result +'"volume":"'+this.volume.value+'",';
      if(this.stock.value != this.product.stock)
        result= result +'"stock":"'+this.stock.value+'",';
      
    
      result = result.slice(0, -1) + "}";
      return result;
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

