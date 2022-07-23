import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HighchartsChartModule} from "highcharts-angular";
import {AppRoutingModule} from "./app-routing.module";
import {QuicklinkModule} from "ngx-quicklink";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    QuicklinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
