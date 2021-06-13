import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {MainComponent} from "@app/modules/explorer/pages/main/main.component";
import {ExplorerRoutingModule} from "@app/modules/explorer/explorer-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "ecapture-ng-ui";
import { ExplorerComponent } from './explorer.component';



@NgModule({
  declarations: [
    MainComponent,
    ExplorerComponent,
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    HttpClientModule,
    HeaderModule
  ],
  providers: [
    ExplorerService
  ]
})
export class ExplorerModule { }
