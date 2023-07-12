import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  email= new FormControl('',[ Validators.required,Validators.email]);
  name= new FormControl('', Validators.required);
  surname= new FormControl('', Validators.required);
  birthdate= new FormControl('', Validators.required);
  pwd= new FormControl('', Validators.required);
  

  constructor(){

  }

  ngOnInit(): void{

  }
  signUp(){
    
  }
  
}
