import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CredentialViewerComponent } from './pages/credential-viewer/credential-viewer.component';

@NgModule({
  declarations:[
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CredentialViewerComponent
  ],
  imports:[
    AuthRoutingModule
  ],

})

export class AuthModule{}
