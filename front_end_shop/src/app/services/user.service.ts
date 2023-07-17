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
    return this.httpClient.get(this.url+"/user/profile",{
      headers:new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    })
  }
  checkToken(){
    const jwtToken = localStorage.getItem('jwt');
    return this.httpClient.get(this.url+"/user/check?token="+jwtToken)
  }
  update(data:string){
    return this.httpClient.post(this.url+"/user/profile/update",data,{
      headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  changePwd(data:string){
    return this.httpClient.post(this.url+"/user/profile/changepwd",data,{
      headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  getAllAddresses(){
    return this.httpClient.get(this.url+"/user/address/getAll",{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
}
