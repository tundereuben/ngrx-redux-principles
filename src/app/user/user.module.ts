import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/userReducer';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', userReducer)
  ]
})
export class UserModule { }
