import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockPageComponent} from './components/block-page/block-page.component';
import {MapNodesComponent} from './components/map-nodes/map-nodes.component';


@NgModule({
  declarations: [
    BlockPageComponent,
    MapNodesComponent
  ],
  exports: [
    BlockPageComponent,
    MapNodesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UiModule {
}
