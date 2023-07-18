import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }

  getProduct(id: string){
    return this.httpClient.get(this.url+"/product/"+id);
  }
  getBestSellers(limit: number){
    return this.httpClient.get(this.url+"/product/getByBestSellers?limit="+limit);
  }
  
}
