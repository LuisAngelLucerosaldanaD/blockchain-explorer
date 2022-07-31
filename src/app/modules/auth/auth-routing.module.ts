import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CredentialViewerComponent} from "./pages/credential-viewer/credential-viewer.component";
import {LoginComponent} from "./pages/login/login.component";
import {TermsConditionsComponent} from "@app/modules/auth/pages/terms-conditions/terms-conditions.component";
import {RegisterComponent} from "@app/modules/auth/pages/register/register.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "credential",
    component: CredentialViewerComponent
  },
  {
    path: "terms-and-conditions",
    component: TermsConditionsComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class AuthRoutingModule {
}
