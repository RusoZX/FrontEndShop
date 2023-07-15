import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  constructor(private userService:UserService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router){

    }
    user ={
      name : '',
      surname:'',
      birthDate:'',
      email:''
    }

  ngOnInit(): void {
      this.load();
  }
  load(){
    this.ngxService.start();
    this.userService.getProfile().subscribe((response:any) => {
      this.user.name=response.name;
      this.user.surname=response.surname;
      this.user.birthDate=response.birthDate;
      this.user.email=response.email;
      this.ngxService.stop();
    },
    error => {
      console.error(error);
      this.ngxService.stop();
      this.snackBar.openSnackBar(error?.error.message,'error');
      this.router.navigate(['/']);
      
    }
  )
    
  }
}
