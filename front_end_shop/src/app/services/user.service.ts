import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }

  signup(data:string){
    return this.httpClient.post(this.url+"/user/signup",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }
  login(data:string){
    return this.httpClient.post(this.url+"/user/login",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }
  getProfile(){
    const jwtToken = localStorage.getItem('jwt');
    return this.httpClient.get(this.url+"/user/profile",{
      headers:new HttpHeaders().set('Authorization', 'Bearer '+jwtToken)
    })
  }
}
