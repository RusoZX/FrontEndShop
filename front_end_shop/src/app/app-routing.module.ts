import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

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
