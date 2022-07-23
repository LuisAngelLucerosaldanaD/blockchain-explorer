import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { CredentialViewerComponent } from "./pages/credential-viewer/credential-viewer.component";
import {LoginComponent} from "./pages/login/login.component";

const routes:Routes=[
  {
    path:"",
    component:AuthComponent
  },
  {
    path:"credential",
    component:CredentialViewerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class AuthRoutingModule{}
