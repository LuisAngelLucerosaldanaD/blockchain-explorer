import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewerComponent} from './pages/viewer/viewer.component';
import {BlockComponent} from './pages/block/block.component';
import {ViewCredentialsRoutingModule} from "@app/modules/view-credentials/view-credentials-routing.module";
import {ExplorerService} from "@app/modules/explorer/services/explorer.service";
import {ToastModule} from "ecapture-ng-ui";
import {UiModule} from "@app/core/ui/ui.module";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {CredentialService} from "@app/core/services/credential/credential.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {QuicklinkModule} from "ngx-quicklink";
import {QRCodeModule} from "angular2-qrcode";


@NgModule({
  declarations: [
    ViewerComponent,
    BlockComponent,
  ],
  imports: [
    CommonModule,
    ViewCredentialsRoutingModule,
    ToastModule,
    UiModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    QuicklinkModule,
    QRCodeModule
  ],
  providers: [
    ExplorerService,
    ToastService,
    CredentialService
  ]
})
export class ViewCredentialsModule {
}
