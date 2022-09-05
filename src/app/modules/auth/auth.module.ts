import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {CredentialViewerComponent} from './pages/credential-viewer/credential-viewer.component';
import {ExplorerService} from "../explorer/services/explorer.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {UiModule} from "@app/ui/ui.module";
import {QuicklinkModule} from "ngx-quicklink";
import {DropdownModule, IconsModule, ToastModule, ToggleModule} from "ecapture-ng-ui";
import {AuthService} from "@app/modules/auth/services/auth.service";
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { ActivateUserComponent } from './pages/activate-user/activate-user.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DeleteAccountComponent } from './pages/delete-account/delete-account.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CredentialViewerComponent,
    TermsConditionsComponent,
    RecoveryPasswordComponent,
    ActivateUserComponent,
    ResetPasswordComponent,
    DeleteAccountComponent,
    ChangePasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    UiModule,
    QuicklinkModule,
    ReactiveFormsModule,
    ToastModule,
    IconsModule,
    DropdownModule,
    ToggleModule,
    TranslateModule
  ],
  providers: [ExplorerService, AuthService]
})

export class AuthModule {
}
