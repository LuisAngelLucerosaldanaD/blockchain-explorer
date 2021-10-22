import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from "@app/modules/auth/auth.component";
import {AuthRoutingModule} from "@app/modules/auth/auth-routing.module";
import {LoginComponent} from './pages/login/login.component';
import {
    ButtonModule,
    ButtonTabModule,
    DropdownModule, IconsModule,
    InputDateModule,
    InputPasswordModule,
    InputTextModule, ToggleModule
} from "ecapture-ng-ui";
import {TranslateModule} from "@ngx-translate/core";
import {LoginService} from "@app/modules/auth/services/login.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RegisterUserComponent} from "@app/modules/auth/pages/register-user/register-user.component";
import {RecoveryPwdComponent} from "@app/modules/auth/pages/recovery-pwd/recovery-pwd.component";
import {ActivateUserComponent} from './pages/activate-user/activate-user.component';
import {ActivateWalletComponent} from './pages/activate-wallet/activate-wallet.component';
import {ActivateService} from "@app/modules/auth/services/activate/activate.service";
import {UiModule} from "@app/ui/ui.module";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterUserComponent,
    RecoveryPwdComponent,
    ActivateUserComponent,
    ActivateWalletComponent
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
        HttpClientModule,
        InputDateModule,
        DropdownModule,
        ToggleModule,
        UiModule,
        IconsModule
    ],
  providers: [
    LoginService,
    ActivateService
  ]
})
export class AuthModule {
}
