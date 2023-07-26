import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private fb:FormBuilder,
     private userService:UserService,
      private snackBar:SnackbarService,
      private ngxService:NgxUiLoaderService,
      private router:Router,
      private sharedService: SharedService){
        this.sharedService.setPrev(this.router.url);
  }

  signupForm = this.fb.group({
    'email': ['',[ Validators.required,Validators.email]],
    'name': ['', Validators.required],
    'surname': ['', Validators.required],
    'birthdate': ['', Validators.required],
    'pwd': ['', Validators.required],
    'confPwd': ['', Validators.required]
  })
  
  get email(){
    return this.signupForm.get('email') as FormControl;
  }
  get name(){
    return this.signupForm.get('name') as FormControl;
  }
  get surname(){
    return this.signupForm.get('surname') as FormControl;
  }
  get birthdate(){
    return this.signupForm.get('birthdate') as FormControl;
  }
  get pwd(){
    return this.signupForm.get('pwd') as FormControl;
  }
  get confPwd(){
    return this.signupForm.get('confPwd') as FormControl;
  }
  



  ngOnInit(): void{

  }
  validatePwd(){
    return this.signupForm.controls['pwd'].value == this.signupForm.controls['confPwd'].value
  }

  signUp(){
    this.ngxService.start();
    this.userService.signup(JSON.stringify(this.signupForm.value)).subscribe(
      (response:any) => {
        this.ngxService.stop();
        this.snackBar.openSnackBar(response?.message,'');
        this.router.navigate(['/login']);
      },
      error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message,'error');
      }
    )
  
  }
  
}
