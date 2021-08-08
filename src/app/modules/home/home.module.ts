import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "@app/modules/home/home.component";
import {HomeRoutingModule} from "@app/modules/home/home-routing.module";
import {IconsModule} from "ecapture-ng-ui";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IconsModule
    ]
})
export class HomeModule { }
