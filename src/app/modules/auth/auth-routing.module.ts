import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "@app/modules/auth/pages/login/login.component";
import {RegisterUserComponent} from "@app/modules/auth/pages/register-user/register-user.component";
import {RecoveryPwdComponent} from "@app/modules/auth/pages/recovery-pwd/recovery-pwd.component";
import {ActivateUserComponent} from "@app/modules/auth/pages/activate-user/activate-user.component";
import {ActivateWalletComponent} from "@app/modules/auth/pages/activate-wallet/activate-wallet.component";
import {ActivateGuard} from "@app/modules/auth/guards/activate.guard";

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
  },
  {
    path: 'activate-account',
    component: ActivateUserComponent,
    canActivate: [ActivateGuard]
  },
  {
    path: 'activate-wallet',
    component: ActivateWalletComponent,
    canActivate: [ActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
