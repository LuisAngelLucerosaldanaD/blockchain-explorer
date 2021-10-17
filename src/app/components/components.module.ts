import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {PdfViewerComponent} from "@app/components/pdf-viewer/pdf-viewer.component";


@NgModule({
  declarations: [
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    PdfViewerComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ComponentsModule { }
