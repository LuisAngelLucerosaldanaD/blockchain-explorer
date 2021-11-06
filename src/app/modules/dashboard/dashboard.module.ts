import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from "@app/modules/dashboard/dashboard-routing.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {UiModule} from "@app/ui/ui.module";
import {LoginService} from "@app/modules/auth/services/login.service";
import {HttpClientModule} from "@angular/common/http";
import {ExplorerModule} from "@app/modules/explorer/explorer.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    UiModule,
    HttpClientModule,
    ExplorerModule
  ],
  providers: [
    LoginService
  ]
})
export class DashboardModule {
}
