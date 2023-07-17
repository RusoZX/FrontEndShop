import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  constructor(private fb:FormBuilder,
    private userService:UserService,
     private snackBar:SnackbarService,
     private ngxService:NgxUiLoaderService,
     private router:Router){

 }

 changeForm = this.fb.group({
   'oldPwd': ['', Validators.required],
   'pwd': ['', Validators.required],
   'confPwd': ['', Validators.required]
 })
 
 get oldPwd(){
   return this.changeForm.get('oldPwd') as FormControl;
 }
 get pwd(){
   return this.changeForm.get('pwd') as FormControl;
 }
 get confPwd(){
   return this.changeForm.get('confPwd') as FormControl;
 }
 
 ngOnInit(): void{

 }
 validatePwd(){
   return this.changeForm.controls['pwd'].value == this.changeForm.controls['confPwd'].value
 }

 update(){
   this.ngxService.start();
   this.userService.changePwd(this.createJson()).subscribe(
     (response:any) => {
        this.updateToken();
        this.ngxService.stop();
       this.router.navigate(['/user/profile']);
     },
     error => {
       console.error(error);
       this.ngxService.stop();
       this.snackBar.openSnackBar(error?.error.message,'error');
     }
   )
 
 }
 createJson():string{
  return '{"oldPwd":"'+this.oldPwd.value+'","newPwd":"'+this.pwd.value+'"}';
 }
 createJson2():string{
  return '{"email":"'+localStorage.getItem('email')+'","pwd":"'+this.pwd.value+'"}';
 }
 updateToken(){
  this.userService.login(this.createJson2()).subscribe((response:any) => {
    localStorage.setItem('jwt',response.token);
    this.snackBar.openSnackBar(GlobalConstants.pwdUpdated,'');
  },
  error => {
    console.error(error);
    this.snackBar.openSnackBar(error?.error.message,'error');
  });
 }
 
}
