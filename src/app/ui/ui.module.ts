import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header/header.component';
import {RouterModule} from "@angular/router";
import {BlockUiComponent} from "@app/ui/components/block-ui/block-ui.component";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BlockUiComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BlockUiComponent
  ]
})
export class UiModule {
}
