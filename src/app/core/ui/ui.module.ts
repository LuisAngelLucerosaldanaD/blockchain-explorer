import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastItemComponent} from './toast-item/toast-item.component';
import {ToastComponent} from "@app/core/ui/toast/toast.component";
import {PdfViewerComponent} from "@app/core/ui/pdf-viewer/pdf-viewer.component";


@NgModule({
  declarations: [
    ToastComponent,
    ToastItemComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ToastItemComponent, ToastComponent, PdfViewerComponent]
})
export class UiModule {
}
