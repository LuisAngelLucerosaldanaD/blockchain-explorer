import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerComponent} from "./explorer.component";
import {ExplorerRoutingModule} from "./explorer-routing.module";
import {HighchartsChartModule} from "highcharts-angular";




@NgModule({
  declarations: [
    ExplorerComponent
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    HighchartsChartModule,
  ]
})
export class ExplorerModule {

}




