import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { BlockComponent } from './pages/block/block.component';
import {ViewCredentialsRoutingModule} from "@app/modules/view-credentials/view-credentials-routing.module";



@NgModule({
  declarations: [
    ViewerComponent,
    BlockComponent,
  ],
  imports: [
    CommonModule,
    ViewCredentialsRoutingModule
  ]
})
export class ViewCredentialsModule { }
