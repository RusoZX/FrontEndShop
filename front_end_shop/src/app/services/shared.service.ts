import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private address = {
    id:'',
    country:'',
    city:'',
    postalCode:'',
    street:'',
    home:'',
    apartment:''
  }
  setAddress(obj:any){
    this.address=obj;
  }
  getAddress():any{
    return this.address;
  }
}
