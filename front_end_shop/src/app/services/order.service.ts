import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
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
  getAllClientOrders(){
    return this.httpClient.get(this.url+"/order/getAll",{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    })
  }
  getClientOrder(id:string){
    return this.httpClient.get(this.url+"/order/get"+id,{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    })
  }
  getGoods(id:string){
    return this.httpClient.get(this.url+"/order/getGoods"+id,{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    })
  }
  getEmployeeOrders(data:string,search:string){
    return this.httpClient.get(this.url + "/order/getAllOrders" + (data !== 'none' ? "?mode=" + data + (search !== '' ? "&search=" + search : "") : ""),{
      headers:new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    })
  }
  updateOrder(data:string){
    return this.httpClient.post(this.url+"/order/updateStatus",data,{
      headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', 'Bearer '+localStorage.getItem('jwt'))
    });
  }
  
}
