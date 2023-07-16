import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, Validators, FormBuilder,AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private fb:FormBuilder,
    private userService:UserService,
     private snackBar:SnackbarService,
     private ngxService:NgxUiLoaderService){

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
  
       this.updateForm = this.fb.group({
        'name': [response.name, Validators.required],
        'surname': [response.surname, Validators.required],
        'birthdate': [new Date(response.birthDate).toISOString().substr(0, 10), Validators.required]
      }, { validators: notSameValidator(response.name, response.surname, new Date(response.birthDate).toISOString().substr(0, 10)) });
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
  if(this.name != this.response.name)
    result= result +'"name":"'+this.name+'",';
  if(this.surname != this.response.surname)
    result= result +'"surname":"'+this.surname+'",';
  if(this.birthdate != this.response.birthdate)
    result= result +'"birthdate":"'+this.birthdate+'",';

  result = result.slice(0, -1) + "}";
  return result;
 }

}
function notSameValidator(oldName: string, oldSurname: string,oldBirthDate: string,) {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const hasDifferentValue = control.get('name')?.value != oldName
     || control.get('surname')?.value != oldSurname 
     || control.get('birthdate')?.value != oldBirthDate;
     if (hasDifferentValue) {
      return Promise.resolve({notSame:true}); // At least one control has a different value
    }

    return Promise.resolve(null);
  };
}
