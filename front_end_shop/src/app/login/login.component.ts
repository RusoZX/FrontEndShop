import { Component } from '@angular/core';

import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,
    private userService:UserService,
      private snackBar:SnackbarService,
      private ngxService:NgxUiLoaderService,
      private router:Router){

  }

  loginForm = this.fb.group({
    'email': ['',[ Validators.required,Validators.email]],
    'pwd': ['', Validators.required]
  })
  
  get email(){
    return this.loginForm.get('email') as FormControl;
  }
  get pwd(){
    return this.loginForm.get('pwd') as FormControl;
  }

  ngOnInit(): void{

  }
  login(){
    this.ngxService.start();
    this.userService.login(JSON.stringify(this.loginForm.value)).subscribe(
      (response:any) => {
        this.snackBar.openSnackBar(GlobalConstants.logIn,'');
        localStorage.setItem('jwt',response.token);
        this.ngxService.stop();
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message,'error');
        
      }
    )
  
  }
  
}
