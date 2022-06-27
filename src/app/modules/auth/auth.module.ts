import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {CredentialViewerComponent} from './pages/credential-viewer/credential-viewer.component';
import {ExplorerService} from "../explorer/services/explorer.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UiModule} from "../../ui/ui.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CredentialViewerComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    UiModule
  ],
  providers: [ExplorerService]
})

export class AuthModule {
}
