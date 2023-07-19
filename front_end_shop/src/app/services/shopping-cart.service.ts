import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }
  add(data:string){
    return this.httpClient.post(this.url+"/cart/add",data,{
      headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  remove(data:string){
    return this.httpClient.delete(this.url+"/cart/remove?id="+data,{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  removeAll(){
    return this.httpClient.delete(this.url+"/cart/removeAll",{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  edit(data:string){
    return this.httpClient.post(this.url+"/cart/edit",data,{
      headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  get(){
    return this.httpClient.get(this.url+"/cart/get",{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
}
