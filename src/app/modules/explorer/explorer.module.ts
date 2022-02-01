import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {MainComponent} from "@app/modules/explorer/pages/main/main.component";
import {ExplorerRoutingModule} from "@app/modules/explorer/explorer-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {
  DropdownModule,
  FileUploadModule,
  HeaderModule, IconsModule, InputPasswordModule,
  InputSearchModule,
  InputTextModule,
  ModalModule, ToastModule, ToastService
} from "ecapture-ng-ui";
import {ExplorerComponent} from './explorer.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {QRCodeModule} from 'angular2-qrcode';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {CredentialViewerComponent} from './pages/credential-viewer/credential-viewer.component';
import {UiModule} from "@app/ui/ui.module";
import {ComponentsModule} from "@app/components/components.module";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { InfoViewerComponent } from './pages/info-viewer/info-viewer.component';


@NgModule({
  declarations: [
    MainComponent,
    ExplorerComponent,
    TransactionsComponent,
    CredentialViewerComponent,
    InfoViewerComponent,
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    HttpClientModule,
    HeaderModule,
    InputTextModule,
    FileUploadModule,
    InputSearchModule,
    NgApexchartsModule,
    DropdownModule,
    ModalModule,
    QRCodeModule,
    IconsModule,
    UiModule,
    ComponentsModule,
    FormsModule,
    ToastModule,
    TranslateModule,
    InputPasswordModule
  ],
  providers: [
    ExplorerService,
    ToastService
  ],
  exports: [MainComponent]
})
export class ExplorerModule {
}
