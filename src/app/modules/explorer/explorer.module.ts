import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerComponent} from "./explorer.component";
import {ExplorerRoutingModule} from "./explorer-routing.module";
import {HighchartsChartModule} from "highcharts-angular";
import { DataViewerComponent } from './pages/data-viewer/data-viewer.component';
import { ExplorerService } from './services/explorer.service';
import { HttpClientModule } from '@angular/common/http';



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
  ],
  providers: [
    ExplorerService
  ]
})
export class ExplorerModule {

}




