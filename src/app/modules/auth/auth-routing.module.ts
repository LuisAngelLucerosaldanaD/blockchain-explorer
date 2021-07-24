import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "@app/modules/explorer/pages/main/main.component";
import {LoginComponent} from "@app/modules/auth/pages/login/login.component";
import {RegisterUserComponent} from "@app/modules/auth/pages/register-user/register-user.component";
import {RecoveryPwdComponent} from "@app/modules/auth/pages/recovery-pwd/recovery-pwd.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-user',
    component: RegisterUserComponent
  },
  {
    path: 'recovery-pwd',
    component: RecoveryPwdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
