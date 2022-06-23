import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations:[
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports:[
    AuthRoutingModule
  ],

})

export class AuthModule{}
