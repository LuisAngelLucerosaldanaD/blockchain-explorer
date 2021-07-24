import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {MainComponent} from "@app/modules/explorer/pages/main/main.component";
import {ExplorerRoutingModule} from "@app/modules/explorer/explorer-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FileUploadModule, HeaderModule, InputSearchModule, InputTextModule} from "ecapture-ng-ui";
import { ExplorerComponent } from './explorer.component';
import {NgApexchartsModule} from "ng-apexcharts";



@NgModule({
  declarations: [
    MainComponent,
    ExplorerComponent,
  ],
    imports: [
        CommonModule,
        ExplorerRoutingModule,
        HttpClientModule,
        HeaderModule,
        InputTextModule,
        FileUploadModule,
        InputSearchModule,
        NgApexchartsModule
    ],
  providers: [
    ExplorerService
  ]
})
export class ExplorerModule { }
