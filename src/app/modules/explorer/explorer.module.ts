import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerComponent} from "./explorer.component";
import {ExplorerRoutingModule} from "./explorer-routing.module";
import {HighchartsChartModule} from "highcharts-angular";
import { DataViewerComponent } from './pages/data-viewer/data-viewer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ExplorerService } from './services/explorer.service';
import { HttpClientModule } from '@angular/common/http';
import {TranslateModule} from "@ngx-translate/core";
import {QRCodeModule} from "angular2-qrcode";
import {UiModule} from "../../ui/ui.module";
import {QuicklinkModule} from "ngx-quicklink";
import { DownloadAppComponent } from './pages/download-app/download-app.component';

@NgModule({
  declarations: [
    ExplorerComponent,
    DataViewerComponent,
    DownloadAppComponent
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    QRCodeModule,
    UiModule,
    QuicklinkModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ],
  providers: [
    ExplorerService
  ]
})
export class ExplorerModule {

}




