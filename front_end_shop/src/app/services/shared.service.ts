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
  private order ={
    goods:'',
    addressId:'',
    deliveryMethod:'',
    paymentMethod:''
  }
  product = {
    id:'',
    title:'',
    category:'',
    price:'',
    brand:'',
    color:'',
    weight:'',
    volume:'',
    stock:''
  }
  setProduct(obj:any){
    this.product=obj;
  }
  getProduct():any{
    return this.product;
  }
  setAddress(obj:any){
    this.address=obj;
  }
  getAddress():any{
    return this.address;
  }
  setGoods(goods:string){
    this.order.goods=goods;
  }
  setOrderAddress(method:string,id:number){
    this.order.deliveryMethod=method;
    this.order.addressId=id.toString();
  }
  getOrder(method:string){
    this.order.paymentMethod=method;
    return this.order;
  }
}
