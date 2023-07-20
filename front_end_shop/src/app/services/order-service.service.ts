import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }
  createOrder(data:string){
    return this.httpClient.post(this.url+"/order/create",data,{
      headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
}
