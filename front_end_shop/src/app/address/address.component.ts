import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{
  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private snackBar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private router:Router,
    private shared:SharedService){
      this.router.events.subscribe(event => {
        //Here we have a list of the permited routes
        const listRoutes=['/user/profile']
        if (event instanceof NavigationEnd) {
          const lastRoute = event.url;
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
      })
  }
  ngOnInit(): void {
    this.load();
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

  load(){
    this.ngxService.start();
    this.route.params.subscribe(params => {
      const id = params['id']; // Retrieve the value of the 'id' parameter
    
      this.userService.getAddress(id).subscribe((response:any) => {
        this.address.id=id;
        this.address.country = response.country;
        this.address.city = response.city;
        this.address.postalCode = response.postalCode;
        this.address.street = response.street;
        this.address.home = response.home;
        this.address.apartment = response.apartment;
        this.ngxService.stop();
      },
      error => {
        console.error(error);
        this.ngxService.stop();
        this.snackBar.openSnackBar(error?.error.message,'error');
        this.router.navigate(['/']);
        
      });
    });
    
  }
  saveShared(){
    this.shared.setAddress(this.address);
  }
  remove(){
    if(confirm(GlobalConstants.removeAddress)){
      this.userService.removeAddress(this.address.id).subscribe((response:any) => {
        this.snackBar.openSnackBar(response.message,'error');
          this.router.navigate(['/user/profile']);
        },
        error => {
          console.error(error);
          this.ngxService.stop();
          this.snackBar.openSnackBar(error?.error.message,'error');
          this.router.navigate(['/user/profile']);
          
        });
      }
  }
}
