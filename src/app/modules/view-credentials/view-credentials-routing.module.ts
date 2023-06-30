import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BlockComponent} from "@app/modules/view-credentials/pages/block/block.component";
import {ViewerComponent} from "@app/modules/view-credentials/pages/viewer/viewer.component";
const routes:Routes=[
  {
    path: "block/:id",
    component: BlockComponent
  },
  {
    path: 'credential',
    component: ViewerComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ViewCredentialsRoutingModule {
}
