import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  constructor(private userService:UserService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private sharedService:SharedService){
      this.sharedService.setPrev(this.router.url);
    }
    user ={
      name : '',
      surname:'',
      birthDate:'',
      email:'',
      addresses:[] as Address[]
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
      this.getAllAddress().subscribe((addresses: any[]) => {
        this.user.addresses = addresses.map(address => {
          return {
            id: address.id,
            city: address.city,
            street: address.street
          };
        });
      });
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
  getAllAddress(): Observable<any> {
    return this.userService.getAllAddresses().pipe(
      catchError(error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message, 'error');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
interface Address {
  id: string;
  city: string;
  street: string;
}
