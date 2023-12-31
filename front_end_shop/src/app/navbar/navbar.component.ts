import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../global-constants';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  

  constructor(private router:Router,
    private snackBar:SnackbarService,
    private userService:UserService){

  }
  employee = false;
  searching = false;
  registered = false;
  ngOnInit(): void {
    this.searching = location.pathname.startsWith('/search');
    this.checkToken();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkToken();
      }
    });
      
  }
  logout(){
    if(confirm(GlobalConstants.confLogout)){
      this.registered= false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('logged');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
    }
  }
  checkToken(){
    var token = localStorage.getItem('jwt');
    if(token == null)
      this.registered = false;
    else{
      this.userService.checkToken().subscribe(
        (response:any) => {
          if(response.message===GlobalConstants.employeeChecked){
            localStorage.setItem('role','employee')
            this.employee=true;
          }
          else{
            localStorage.setItem('role','client')
            this.employee=false;
          }
          this.registered = true;
        },
        error => {
          console.error(error);
          this.registered= false;
          localStorage.removeItem('jwt');
          localStorage.removeItem('email');
          localStorage.removeItem('logged');
          localStorage.removeItem('role');
          if(error?.error.message == GlobalConstants.expired)
            this.snackBar.openSnackBar(GlobalConstants.expiredMsg,'error');
          this.router.navigate(['/']);
        }
      )
    }
  }
  search(searchValue:string){
    this.router.navigate(['search/title/'+searchValue]);
  }
  doNothing(){

  }
}
