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
  getByTitle(limit:number, search: string){
    return this.httpClient.get(this.url+"/product/getByTitle?limit="+limit+"&search="+search);
  }
  getByNone(limit:number){
    return this.httpClient.get(this.url+"/product/getByNone?limit="+limit);
  }
  getByCategory(limit:number, search: string){
    return this.httpClient.get(this.url+"/product/getByCategory?limit="+limit+"&search="+search);
  }
  getByPrice(limit:number, mode: string){
    return this.httpClient.get(this.url+"/product/getByPrice"+mode+"?limit="+limit);
  }
  getByBrand(limit:number, search: string){
    return this.httpClient.get(this.url+"/product/getByBrand?limit="+limit+"&search="+search);
  }
  getByColor(limit:number, search: string){
    return this.httpClient.get(this.url+"/product/getByColor?limit="+limit+"&search="+search);
  }
}
