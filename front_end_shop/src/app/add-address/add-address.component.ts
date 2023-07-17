import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
constructor(
  private userService:UserService,
  private snackBar:SnackbarService,
  private ngxService:NgxUiLoaderService,
  private router:Router,
  private fb:FormBuilder){
  }

  addAddressForm = this.fb.group({
    'country': ['', Validators.required],
    'city': ['', Validators.required],
    'postalCode': ['', Validators.required],
    'street': ['', Validators.required],
    'home': ['', Validators.required],
    'apartment': ['', Validators.required]
    });
  
  get country(){
    return this.addAddressForm.get('country') as FormControl;
  }
  get city(){
    return this.addAddressForm.get('city') as FormControl;
  }
  get postalCode(){
    return this.addAddressForm.get('postalCode') as FormControl;
  }
  get street(){
    return this.addAddressForm.get('street') as FormControl;
  }
  get home(){
    return this.addAddressForm.get('home') as FormControl;
  }
  get apartment(){
    return this.addAddressForm.get('apartment') as FormControl;
  }
  addAddress(){
    this.ngxService.start();
    this.userService.addAddress(JSON.stringify(this.addAddressForm)).subscribe(
      (response:any) => {
        this.ngxService.stop();
        this.snackBar.openSnackBar(response?.message,'');
        this.router.navigate(['/user/profile']);
      },
      error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message,'error');
      }
    )
  
  }
}
