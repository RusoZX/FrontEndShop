import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { FormControl, Validators, FormBuilder,AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  constructor(private shared:SharedService,
    private userService:UserService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private fb:FormBuilder){
        //Here we have a list of the permited routes
        const listRoutes=['/user/address']
          const lastRoute = this.shared.getPrev();
          this.shared.setPrev(this.router.url);
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
  address = {
    id:'',
    country:'',
    city:'',
    postalCode:'',
    street:'',
    home:'',
    apartment:''
  }
  updateForm = this.fb.group({
    'country': ['', Validators.required],
    'city': ['', Validators.required],
    'postalCode': ['', Validators.required],
    'street': ['', Validators.required],
    'home': ['', Validators.required],
    'apartment': ['', Validators.required]
    });
  
  get country(){
    return this.updateForm.get('country') as FormControl;
  }
  get city(){
    return this.updateForm.get('city') as FormControl;
  }
  get postalCode(){
    return this.updateForm.get('postalCode') as FormControl;
  }
  get street(){
    return this.updateForm.get('street') as FormControl;
  }
  get home(){
    return this.updateForm.get('home') as FormControl;
  }
  get apartment(){
    return this.updateForm.get('apartment') as FormControl;
  }

  ngOnInit(): void {
    this.address = this.shared.getAddress();
    if(this.address.id===''){
      this.snackBar.openSnackBar(GlobalConstants.noAddress, 'error');
      this.router.navigate(['/']);
    }else{
      this.ngxService.start();
      const notSameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
          return control.get('country')?.value === this.address.country
          && control.get('city')?.value === this.address.city
          && control.get('postalCode')?.value === this.address.postalCode
          && control.get('street')?.value === this.address.street
          && control.get('home')?.value === this.address.home
          && control.get('apartment')?.value === this.address.apartment 

          ? {notSame:true} : null;
        };
        this.updateForm = this.fb.group({
          'country': [this.address.country, Validators.required],
          'city': [this.address.city, Validators.required],
          'postalCode': [this.address.postalCode, Validators.required],
          'street': [this.address.street, Validators.required],
          'home': [this.address.home, Validators.required],
          'apartment': [this.address.apartment, Validators.required]
        }, { validators: notSameValidator });
        this.ngxService.stop();
    }
  }
  update(){
    this.userService.editAddress(this.createJson()).subscribe(
      (response:any) => {
        this.ngxService.stop();
        this.snackBar.openSnackBar(response?.message,'');
        this.router.navigate(['/user/address/'+this.address.id]);
      },
      error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message,'error');
      }
    )
  }
  createJson():string{
    var result:string ="{";
    result = result + '"addressId":"'+this.address.id+'",';
    if(this.country.value != this.address.country)
      result= result +'"country":"'+this.country.value+'",';
    if(this.city.value != this.address.city)
      result= result +'"city":"'+this.city.value+'",';
    if(this.postalCode.value != this.address.postalCode)
      result= result +'"postalCode":"'+this.postalCode.value+'",';
    if(this.street.value != this.address.street)
      result= result +'"street":"'+this.street.value+'",';
    if(this.home.value != this.address.home)
      result= result +'"home":"'+this.home.value+'",';
    if(this.apartment.value != this.address.apartment)
      result= result +'"apartment":"'+this.apartment.value+'",';
    
  
    result = result.slice(0, -1) + "}";
    return result;
   }
}
