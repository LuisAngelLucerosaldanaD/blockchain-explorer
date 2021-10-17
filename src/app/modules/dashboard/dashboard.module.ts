import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from "@app/modules/dashboard/dashboard-routing.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {UiModule} from "@app/ui/ui.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    UiModule
  ]
})
export class DashboardModule {
}
