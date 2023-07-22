import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CreateOrderAddressComponent } from './create-order-address/create-order-address.component';
import { CreateOrderPaymentComponent } from './create-order-payment/create-order-payment.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { EmployeeOrdersComponent } from './employee-orders/employee-orders.component';
import { EmployeeOrderComponent } from './employee-order/employee-order.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes=[
  {
    path:'signup',
    component: SignUpComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'user/profile',
    component: UserProfileComponent
  },
  {
    path:'user/updateProfile',
    component: EditProfileComponent
  },
  {
    path:'user/changePassword',
    component: ChangePwdComponent
  },
  {
    path:'user/address/:id',
    component: AddressComponent
  },
  {
    path:'user/editaddress',
    component: EditAddressComponent
  },
  {
    path:'user/addaddress',
    component: AddAddressComponent
  },
  //HOME PATH
  {
    path:'',
    component: BestSellersComponent
  },
  {
    path:'product/get/:id',
    component: ProductComponent
  },
  {
    path:'search/title/:search',
    component: SearchComponent
  },
  {
    path:'cart/get',
    component: ShoppingCartComponent
  },
  {
    path:'createOrder/address',
    component: CreateOrderAddressComponent
  },
  {
    path:'createOrder/payment',
    component: CreateOrderPaymentComponent
  },
  {
    path:'user/orders',
    component: ClientOrdersComponent
  },
  {
    path:'user/order/:id',
    component: ClientOrderComponent
  },
  {
    path:'employee/orders',
    component: EmployeeOrdersComponent
  },
  {
    path:'employee/order/:id',
    component: EmployeeOrderComponent
  },
  {
    path:'employee/addProduct',
    component: CreateProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }