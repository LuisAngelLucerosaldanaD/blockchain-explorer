import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerComponent} from "./explorer.component";
import {ExplorerRoutingModule} from "./explorer-routing.module";
import {HighchartsChartModule} from "highcharts-angular";
import { DataViewerComponent } from './pages/data-viewer/data-viewer.component';
import { ExplorerService } from './services/explorer.service';
import { HttpClientModule } from '@angular/common/http';
import {QRCodeModule} from "angular2-qrcode";
import {UiModule} from "../../ui/ui.module";
import {QuicklinkModule} from "ngx-quicklink";

@NgModule({
  declarations: [
    ExplorerComponent,
    DataViewerComponent
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    QRCodeModule,
    UiModule,
    QuicklinkModule
  ],
  providers: [
    ExplorerService
  ]
})
export class ExplorerModule {

}




