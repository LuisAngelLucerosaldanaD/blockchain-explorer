import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from "@app/modules/auth/auth.component";
import {AuthRoutingModule} from "@app/modules/auth/auth-routing.module";
import {LoginComponent} from './pages/login/login.component';
import {
  ButtonTabModule,
  DropdownModule, IconsModule,
  InputDateModule,
  InputPasswordModule,
  InputTextModule, ToastModule, ToggleModule
} from "ecapture-ng-ui";
import {TranslateModule} from "@ngx-translate/core";
import {LoginService} from "@app/modules/auth/services/login.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RegisterUserComponent} from "@app/modules/auth/pages/register-user/register-user.component";
import {RecoveryPwdComponent} from "@app/modules/auth/pages/recovery-pwd/recovery-pwd.component";
import {ActivateUserComponent} from './pages/activate-user/activate-user.component';
import {ActivateWalletComponent} from './pages/activate-wallet/activate-wallet.component';
import {ActivateService} from "@app/modules/auth/services/activate/activate.service";
import {UiModule} from "@app/ui/ui.module";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";
import {TersmConditionsComponent} from './pages/tersm-conditions/tersm-conditions.component';
import {SecurityPoliticsComponent} from './pages/security-politics/security-politics.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterUserComponent,
    RecoveryPwdComponent,
    ActivateUserComponent,
    ActivateWalletComponent,
    TersmConditionsComponent,
    SecurityPoliticsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputPasswordModule,
    InputTextModule,
    ButtonTabModule,
    TranslateModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputDateModule,
    DropdownModule,
    ToggleModule,
    UiModule,
    IconsModule,
    ToastModule
  ],
  providers: [
    LoginService,
    ActivateService,
    AuthService
  ]
})
export class AuthModule {
}
