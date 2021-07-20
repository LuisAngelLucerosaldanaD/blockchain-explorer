import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "@app/modules/auth/auth.component";
import {AuthRoutingModule} from "@app/modules/auth/auth-routing.module";
import { LoginComponent } from './pages/login/login.component';
import {ButtonModule, ButtonTabModule, InputPasswordModule, InputTextModule} from "ecapture-ng-ui";
import {TranslateModule} from "@ngx-translate/core";
import {LoginService} from "@app/modules/auth/services/login.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputPasswordModule,
    ButtonModule,
    InputTextModule,
    ButtonTabModule,
    TranslateModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
  ]
})
export class AuthModule { }
