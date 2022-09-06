import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CredentialViewerComponent} from "./pages/credential-viewer/credential-viewer.component";
import {LoginComponent} from "./pages/login/login.component";
import {TermsConditionsComponent} from "@app/modules/auth/pages/terms-conditions/terms-conditions.component";
import {RegisterComponent} from "@app/modules/auth/pages/register/register.component";
import { RecoveryPasswordComponent } from "@app/modules/auth/pages/recovery-password/recovery-password.component";
import { ResetPasswordComponent } from "@app/modules/auth/pages/reset-password/reset-password.component";
import { DeleteAccountComponent } from "@app/modules/auth/pages/delete-account/delete-account.component";
import { ChangePasswordComponent } from "@app/modules/auth/pages/change-password/change-password.component";
import {RecoveryAccountComponent} from "@app/modules/auth/pages/recovery-account/recovery-account.component";

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
    path: "recovery",
    component: RecoveryAccountComponent
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
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent
  },
  {
    path: 'reset-password',
    component:ResetPasswordComponent
  },
  {
    path: 'delete-account',
    component:DeleteAccountComponent
  },
  {
    path: 'change-password',
    component:ChangePasswordComponent
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
