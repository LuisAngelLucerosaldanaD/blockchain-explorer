import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "@app/modules/home/home.component";
import {HomeRoutingModule} from "@app/modules/home/home-routing.module";
import {IconsModule} from "ecapture-ng-ui";
import {UiModule} from "@app/ui/ui.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IconsModule,
    UiModule
  ]
})
export class HomeModule {
}
