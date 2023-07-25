import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, Validators, FormBuilder,AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private fb:FormBuilder,
    private userService:UserService,
     private snackBar:SnackbarService,
     private ngxService:NgxUiLoaderService,
     private router:Router){
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

 updateForm = this.fb.group({
  'name': ['', Validators.required],
  'surname': ['', Validators.required],
  'birthdate': ['', Validators.required]
});
 

 get name(){
   return this.updateForm.get('name') as FormControl;
 }
 get surname(){
   return this.updateForm.get('surname') as FormControl;
 }
 get birthdate(){
   return this.updateForm.get('birthdate') as FormControl;
 }
 response:any = "";
 
 ngOnInit(): void{
  this.ngxService.start();
   this.userService.getProfile().subscribe(
     (response:any) => {
       this.response = response;

       const notSameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
          return control.get('name')?.value === response.name
          && control.get('surname')?.value === response.surname 
          && control.get('birthdate')?.value === response.birthDate 

          ? {notSame:true} : null;
        };
  
       this.updateForm = this.fb.group({
        'name': [response.name, Validators.required],
        'surname': [response.surname, Validators.required],
        'birthdate': [new Date(response.birthDate).toISOString().substr(0, 10), Validators.required]
      }, { validators: notSameValidator });
      this.ngxService.stop();
     },
     error => {
       console.error(error);
       this.ngxService.stop();
       this.snackBar.openSnackBar(error?.error.message,'error');
     }
   )
 }
 verifyUpdate(){
  return (this.name != this.response.name || this.surname != this.response.surname || this.birthdate != this.response.birthdate)
 }

 update(){
   this.ngxService.start();
   this.userService.update(this.createJson()).subscribe(
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
 createJson():string{
  var result:string ="{";
  if(this.name.value != this.response.name)
    result= result +'"name":"'+this.name.value+'",';
  if(this.surname.value != this.response.surname)
    result= result +'"surname":"'+this.surname.value+'",';
  if(this.birthdate.value != this.response.birthdate)
    result= result +'"birthdate":"'+this.birthdate.value+'",';

  result = result.slice(0, -1) + "}";
  return result;
 }
 

}
